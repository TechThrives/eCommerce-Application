package com.project.digitalshop.services.implementation;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.category.CategoryDTO;
import com.project.digitalshop.dto.category.CategoryResponseDTO;
import com.project.digitalshop.exception.NotFoundException;
import com.project.digitalshop.model.Cart;
import com.project.digitalshop.model.Category;
import com.project.digitalshop.model.Invoice;
import com.project.digitalshop.model.Product;
import com.project.digitalshop.model.Wishlist;
import com.project.digitalshop.repository.CartRepository;
import com.project.digitalshop.repository.CategoryRepository;
import com.project.digitalshop.repository.InvoiceRepository;
import com.project.digitalshop.repository.ProductRepository;
import com.project.digitalshop.repository.WishlistRepository;
import com.project.digitalshop.repository.specification.GenericSpecification;
import com.project.digitalshop.services.interfaces.ICategoryService;
import com.project.digitalshop.util.SlugUtils;

import jakarta.validation.Valid;

@Service
@Validated
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final WishlistRepository wishlistRepository;
    private final InvoiceRepository invoiceRepository;
    private final CloudinaryService cloudinaryService;

    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository,
            CartRepository cartRepository, WishlistRepository wishlistRepository, InvoiceRepository invoiceRepository, CloudinaryService cloudinaryService) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.wishlistRepository = wishlistRepository;
        this.invoiceRepository = invoiceRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public CategoryResponseDTO createCategory(@Valid CategoryDTO categoryDTO) {
        Category category = new Category();
        BeanUtils.copyProperties(categoryDTO, category);
        String slug = SlugUtils.createSlug(category.getName());
        category.setSlug(slug);
        int count = 1;
        String originalSlug = slug;
        while (categoryRepository.findBySlug(slug).isPresent()) {
            slug = originalSlug + "-" + count;
            count++;
        }
        category.setSlug(slug);
        category = categoryRepository.save(category);
        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        BeanUtils.copyProperties(category, categoryResponseDTO);
        return categoryResponseDTO;
    }

    @Override
    public CategoryResponseDTO updateCategory(UUID categoryId, @Valid CategoryDTO categoryDTO) {
        Category existingCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category Not Found!!!"));
        BeanUtils.copyProperties(categoryDTO, existingCategory);
        existingCategory = categoryRepository.save(existingCategory);

        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        BeanUtils.copyProperties(existingCategory, categoryResponseDTO);
        return categoryResponseDTO;
    }

    @Override
    public void deleteCategory(UUID categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new NotFoundException("Category Not Found!!!");
        }
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category Not Found!!!"));

        // Get all products associated with the category
        List<Product> products = productRepository.findByCategory(category);

        // Delete products associated with the category
        products.forEach(product -> {
            UUID productId = product.getId();

            // Remove product from wishlists
            List<Wishlist> wishlists = wishlistRepository.findByProductsContains(product);
            wishlists.forEach(wishlist -> {
                wishlist.getProducts().removeIf(p -> p.getId().equals(productId));
                wishlistRepository.save(wishlist); // Save the updated wishlist
            });

            // Remove product from carts
            List<Cart> carts = cartRepository.findByProductsContains(product);
            carts.forEach(cart -> {
                cart.getProducts().removeIf(p -> p.getId().equals(productId));
                cartRepository.save(cart); // Save the updated cart
            });

            // Remove product from invoices
            List<Invoice> invoices = invoiceRepository.findByProductsContains(product);
            invoices.forEach(invoice -> {
                invoice.getProducts().removeIf(p -> p.getId().equals(productId));
                invoiceRepository.save(invoice); // Save the updated invoice
            });

            List<String> existingImageUrls = product.getImageUrls();
            if (existingImageUrls != null && !existingImageUrls.isEmpty()) {
                cloudinaryService.deleteFiles(existingImageUrls, "products");
            }
            
            String existingFileUrl = product.getDownloadUrl();
            if (existingFileUrl != null) {
                cloudinaryService.deleteFile(existingFileUrl, "productsFiles");
            }
        });

        categoryRepository.deleteById(categoryId);
    }

    @Override
    public CategoryResponseDTO getCategoryById(UUID categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category Not Found!!!"));
        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        BeanUtils.copyProperties(category, categoryResponseDTO);
        return categoryResponseDTO;
    }

    @Override
    public CategoryResponseDTO getCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Category Not Found!!!"));
        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        BeanUtils.copyProperties(category, categoryResponseDTO);
        return categoryResponseDTO;
    }

    @Override
    public Page<CategoryResponseDTO> getAllCategories(String searchVal, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        List<String> columns = Arrays.asList("name", "description");
        GenericSpecification<Category> spec = new GenericSpecification<>(searchVal, columns);
        Specification<Category> specification = spec.buildSpecification();
        Page<Category> categoriesPage = categoryRepository.findAll(specification, pageable);
        return categoriesPage.map(category -> {
            CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
            BeanUtils.copyProperties(category, categoryResponseDTO);
            return categoryResponseDTO;
        });
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> {
                    CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
                    BeanUtils.copyProperties(category, categoryResponseDTO);
                    return categoryResponseDTO;
                })
                .collect(Collectors.toList());
    }
}
