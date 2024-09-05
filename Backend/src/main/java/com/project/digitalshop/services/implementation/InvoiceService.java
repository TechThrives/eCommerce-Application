package com.project.digitalshop.services.implementation;

import java.util.UUID;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.invoice.InvoiceDTO;
import com.project.digitalshop.dto.invoice.InvoiceUserDTO;
import com.project.digitalshop.dto.invoice.InvoiceResponseDTO;
import com.project.digitalshop.dto.category.CategoryProductDTO;
import com.project.digitalshop.dto.product.ProductResponseDTO;
import com.project.digitalshop.exception.NotFoundException;
import com.project.digitalshop.exception.ResourceAlreadyExistsException;
import com.project.digitalshop.model.Invoice;
import com.project.digitalshop.model.PaymentStatus;
import com.project.digitalshop.model.Product;
import com.project.digitalshop.model.User;
import com.project.digitalshop.repository.InvoiceRepository;
import com.project.digitalshop.repository.ProductRepository;
import com.project.digitalshop.repository.UserRepository;
import com.project.digitalshop.services.interfaces.IInvoiceService;

import jakarta.validation.Valid;

@Service
@Validated
public class InvoiceService implements IInvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final EmailService emailService;

    public InvoiceService(InvoiceRepository invoiceRepository, UserRepository userRepository,
            ProductRepository productRepository, EmailService emailService) {
        this.invoiceRepository = invoiceRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.emailService = emailService;
    }

    @Override
    public InvoiceResponseDTO createInvoice(@Valid InvoiceDTO invoiceDTO) {
        Invoice existingInvoice = invoiceRepository.findBySessionId(invoiceDTO.getSessionId())
                .orElse(null);

        if (existingInvoice != null && existingInvoice.getPaymentStatus() == PaymentStatus.SUCCESS) {
            throw new ResourceAlreadyExistsException("Invoice already created with payment success");
        }

        Invoice invoice = new Invoice();
        invoice.setSessionId(invoiceDTO.getSessionId());
        User user = userRepository.findById(invoiceDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("User Not Found!!!"));
        invoice.setUser(user);
        invoice.setProducts(invoiceDTO.getProductIds().stream()
                .map(productId -> productRepository.findById(productId)
                        .orElseThrow(() -> new NotFoundException("Product Not Found!!!")))
                .collect(Collectors.toList()));
        invoice.setSubTotal(invoiceDTO.getSubTotal());
        invoice.setTax(invoiceDTO.getTax());
        invoice.setTotalPrice(invoiceDTO.getTotalPrice());

        // Update Invoice
        invoice.setPaymentStatus(invoiceDTO.getPaymentStatus());
        invoice.setPaymentMethod(invoiceDTO.getPaymentMethod());
        invoice = invoiceRepository.save(invoice);

        // Clear user cart
        user.getCart().getProducts().clear();
        userRepository.save(user);

        InvoiceResponseDTO invoiceResponseDTO = new InvoiceResponseDTO();
        BeanUtils.copyProperties(invoice, invoiceResponseDTO, "products", "user");
        InvoiceUserDTO invoiceUserDTO = new InvoiceUserDTO();
        BeanUtils.copyProperties(invoice.getUser(), invoiceUserDTO);
        invoiceResponseDTO.setUser(invoiceUserDTO);
        invoiceResponseDTO.setProducts(invoice.getProducts().stream().map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            // Map Category to CategoryDTO
            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        }).collect(Collectors.toList()));

        Map<String, String> downloadLinks = invoice.getProducts().stream()
                .collect(Collectors.toMap(
                        product -> product.getId().toString(),
                        product -> product.getDownloadUrl()));

        sendInvoiceEmail(user.getEmail(), invoiceResponseDTO, downloadLinks);
        return invoiceResponseDTO;
    }

    private boolean sendInvoiceEmail(String to, InvoiceResponseDTO invoiceResponseDTO, Map<String, String> downloadLinks) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("invoice", invoiceResponseDTO);
        variables.put("downloadLinks", downloadLinks); 
        return emailService.sendHtmlMessage(to, "Invoice - Digital Shop", variables, "invoice");
    }

    @Override
    public void deleteInvoice(UUID invoiceId) {
        if (!invoiceRepository.existsById(invoiceId)) {
            throw new NotFoundException("Invoice Not Found!!!");
        }
        invoiceRepository.deleteById(invoiceId);
    }

    @Override
    public InvoiceResponseDTO getInvoiceById(UUID invoiceId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new NotFoundException("Invoice Not Found!!!"));
        List<Product> products = invoice.getProducts();
        InvoiceResponseDTO invoiceResponseDTO = new InvoiceResponseDTO();
        BeanUtils.copyProperties(invoice, invoiceResponseDTO, "products", "user");
        InvoiceUserDTO invoiceUserDTO = new InvoiceUserDTO();
        BeanUtils.copyProperties(invoice.getUser(), invoiceUserDTO);
        invoiceResponseDTO.setUser(invoiceUserDTO);
        invoiceResponseDTO.setProducts(products.stream().map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            // Map Category to CategoryDTO
            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        }).collect(Collectors.toList()));
        return invoiceResponseDTO;
    }

    @Override
    public Page<InvoiceResponseDTO> getInvoicesByUserId(UUID userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Invoice> invoicePage = invoiceRepository.findAllByUserId(userId, pageable);

        return invoicePage.map(invoice -> {
            InvoiceResponseDTO invoiceResponseDTO = new InvoiceResponseDTO();
            BeanUtils.copyProperties(invoice, invoiceResponseDTO, "products", "user");
            InvoiceUserDTO invoiceUserDTO = new InvoiceUserDTO();
            BeanUtils.copyProperties(invoice.getUser(), invoiceUserDTO);
            invoiceResponseDTO.setUser(invoiceUserDTO);
            invoiceResponseDTO.setProducts(invoice.getProducts().stream().map(product -> {
                ProductResponseDTO productResponseDTO = new ProductResponseDTO();
                BeanUtils.copyProperties(product, productResponseDTO);

                // Map Category to CategoryDTO
                CategoryProductDTO categoryDTO = new CategoryProductDTO();
                BeanUtils.copyProperties(product.getCategory(), categoryDTO);
                productResponseDTO.setCategory(categoryDTO);
                return productResponseDTO;
            }).collect(Collectors.toList()));
            return invoiceResponseDTO;
        });
    }

    @Override
    public Page<InvoiceResponseDTO> getAllInvoices(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Invoice> invoicePage = invoiceRepository.findAll(pageable);

        return invoicePage.map(invoice -> {
            InvoiceResponseDTO invoiceResponseDTO = new InvoiceResponseDTO();
            BeanUtils.copyProperties(invoice, invoiceResponseDTO, "products", "user");
            InvoiceUserDTO invoiceUserDTO = new InvoiceUserDTO();
            BeanUtils.copyProperties(invoice.getUser(), invoiceUserDTO);
            invoiceResponseDTO.setUser(invoiceUserDTO);
            invoiceResponseDTO.setProducts(invoice.getProducts().stream().map(product -> {
                ProductResponseDTO productResponseDTO = new ProductResponseDTO();
                BeanUtils.copyProperties(product, productResponseDTO);

                // Map Category to CategoryDTO
                CategoryProductDTO categoryDTO = new CategoryProductDTO();
                BeanUtils.copyProperties(product.getCategory(), categoryDTO);
                productResponseDTO.setCategory(categoryDTO);
                return productResponseDTO;
            }).collect(Collectors.toList()));
            return invoiceResponseDTO;
        });
    }

}
