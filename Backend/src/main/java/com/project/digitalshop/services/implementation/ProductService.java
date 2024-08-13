package com.project.digitalshop.services.implementation;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.category.CategoryProductDTO;
import com.project.digitalshop.dto.product.ProductDTO;
import com.project.digitalshop.dto.product.ProductResponseDTO;
import com.project.digitalshop.dto.product.ProductUpdateDTO;
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
import com.project.digitalshop.repository.specification.ProductSpecification;
import com.project.digitalshop.services.interfaces.IProductService;
import com.project.digitalshop.util.SlugUtils;

import jakarta.validation.Valid;

@Service
@Validated
public class ProductService implements IProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CartRepository cartRepository;
    private final WishlistRepository wishlistRepository;
    private final InvoiceRepository invoiceRepository;
    private final CloudinaryService cloudinaryService;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository,
            CartRepository cartRepository, WishlistRepository wishlistRepository, InvoiceRepository invoiceRepository, CloudinaryService cloudinaryService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.cartRepository = cartRepository;
        this.wishlistRepository = wishlistRepository;
        this.invoiceRepository = invoiceRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public ProductResponseDTO createProduct(@Valid ProductDTO productDTO) {
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product, "images", "categoryId");

        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Category Not Found!!!"));
        product.setCategory(category);
        String slug = SlugUtils.createSlug(product.getName());
        product.setSlug(slug);
        int count = 1;
        String originalSlug = slug;
        while (productRepository.findBySlug(slug).isPresent()) {
            slug = originalSlug + "-" + count;
            count++;
        }
        product.setSlug(slug);

        List<String> imageUrls = cloudinaryService.uploadFiles(productDTO.getImages(), "products");
        product.setImageUrls(imageUrls);

        product = productRepository.save(product);
        category.incrementProductCount();
        categoryRepository.save(category);

        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        BeanUtils.copyProperties(product, productResponseDTO);
        // Map Category to CategoryDTO
        CategoryProductDTO categoryDTO = new CategoryProductDTO();
        BeanUtils.copyProperties(product.getCategory(), categoryDTO);
        productResponseDTO.setCategory(categoryDTO);
        return productResponseDTO;
    }

    @Override
    public ProductResponseDTO updateProduct(UUID productId, @Valid ProductUpdateDTO productUpdateDTO) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));
        BeanUtils.copyProperties(productUpdateDTO, existingProduct, "images");

        if (productUpdateDTO.getImages() != null && !productUpdateDTO.getImages().isEmpty()) {
            List<String> existingImageUrls = existingProduct.getImageUrls();
            if (existingImageUrls != null && !existingImageUrls.isEmpty()) {
                cloudinaryService.deleteFiles(existingImageUrls, "products");
            }

            List<String> newImageUrls = cloudinaryService.uploadFiles(productUpdateDTO.getImages(), "products");
            existingProduct.setImageUrls(newImageUrls);
        }
        existingProduct = productRepository.save(existingProduct);

        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        BeanUtils.copyProperties(existingProduct, productResponseDTO);
        // Map Category to CategoryDTO
        CategoryProductDTO categoryDTO = new CategoryProductDTO();
        BeanUtils.copyProperties(existingProduct.getCategory(), categoryDTO);
        productResponseDTO.setCategory(categoryDTO);
        return productResponseDTO;
    }

    @Override
    public void deleteProduct(UUID productId) {
        if (!productRepository.existsById(productId)) {
            throw new NotFoundException("Product Not Found!!!");
        }
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));

        Category category = product.getCategory();
        category.decrementProductCount();
        categoryRepository.save(category);

        // Get all wishlists that contain the product
        List<Wishlist> wishlists = wishlistRepository.findByProductsContains(product);
        wishlists.forEach(wishlist -> {
            wishlist.getProducts().removeIf(p -> p.getId().equals(productId));
            wishlistRepository.save(wishlist); // Save the updated wishlist
        });

        // Get all carts that contain the product
        List<Cart> carts = cartRepository.findByProductsContains(product);
        carts.forEach(cart -> {
            cart.getProducts().removeIf(p -> p.getId().equals(productId));
            cartRepository.save(cart); // Save the updated cart
        });

        // Get all invoices that contain the product
        List<Invoice> invoices = invoiceRepository.findByProductsContains(product);
        invoices.forEach(invoice -> {
            invoice.getProducts().removeIf(p -> p.getId().equals(productId));
            invoiceRepository.save(invoice); // Save the updated invoice
        });

        List<String> existingImageUrls = product.getImageUrls();
        if (existingImageUrls != null && !existingImageUrls.isEmpty()) {
            cloudinaryService.deleteFiles(existingImageUrls, "products");
        }
        productRepository.deleteById(productId);
    }

    @Override
    public ProductResponseDTO getProductById(UUID productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));
        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        BeanUtils.copyProperties(product, productResponseDTO);
        // Map Category to CategoryDTO
        CategoryProductDTO categoryDTO = new CategoryProductDTO();
        BeanUtils.copyProperties(product.getCategory(), categoryDTO);
        productResponseDTO.setCategory(categoryDTO);
        return productResponseDTO;
    }

    @Override
    public ProductResponseDTO getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));
        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        BeanUtils.copyProperties(product, productResponseDTO);
        // Map Category to CategoryDTO
        CategoryProductDTO categoryDTO = new CategoryProductDTO();
        BeanUtils.copyProperties(product.getCategory(), categoryDTO);
        productResponseDTO.setCategory(categoryDTO);
        return productResponseDTO;
    }

    @Override
    public Page<ProductResponseDTO> getAllProducts(String searchVal, List<String> tags, BigDecimal minPrice,
            BigDecimal maxPrice, String sortBy, int pageNo, int pageSize) {
        // Create Pageable with sorting based on sortBy parameter
        Pageable pageable;
        if (sortBy.equalsIgnoreCase("priceAsc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("price").ascending());
        } else if (sortBy.equalsIgnoreCase("priceDesc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("price").descending());
        } else if (sortBy.equalsIgnoreCase("avgRatingAsc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("avgRating").ascending());
        } else if (sortBy.equalsIgnoreCase("avgRatingDesc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("avgRating").descending());
        } else {
            pageable = PageRequest.of(pageNo, pageSize);
        }

        // Retrieve products using a custom specification based on search criteria
        Page<Product> productsPage = productRepository.findAll(
                ProductSpecification.filterProducts(searchVal, tags, minPrice, maxPrice),
                pageable);

        // Map Product entities to ProductResponseDTOs
        return productsPage.map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            // Map Category to CategoryDTO
            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        });
    }

    @Override
    public Page<ProductResponseDTO> getAllProductsByCategoryId(UUID categoryId, String searchVal, List<String> tags,
            BigDecimal minPrice,
            BigDecimal maxPrice, String sortBy, int pageNo, int pageSize) {
        // Create Pageable with sorting based on sortBy parameter
        Pageable pageable;
        if (sortBy.equalsIgnoreCase("priceAsc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("price").ascending());
        } else if (sortBy.equalsIgnoreCase("priceDesc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("price").descending());
        } else if (sortBy.equalsIgnoreCase("avgRatingAsc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("avgRating").ascending());
        } else if (sortBy.equalsIgnoreCase("avgRatingDesc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("avgRating").descending());
        } else {
            pageable = PageRequest.of(pageNo, pageSize);
        }

        // Retrieve products using a custom specification based on search criteria
        Page<Product> productsPage = productRepository.findAll(
                ProductSpecification.filterProductsByCategoryId(
                        categoryId, searchVal, tags, minPrice, maxPrice),
                pageable);

        // Map Product entities to ProductResponseDTOs
        return productsPage.map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            // Map Category to CategoryDTO
            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        });
    }

    @Override
    public Page<ProductResponseDTO> getAllProductsByCategorySlug(String categorySlug, String searchVal,
            List<String> tags,
            BigDecimal minPrice,
            BigDecimal maxPrice, String sortBy, int pageNo, int pageSize) {
        // Create Pageable with sorting based on sortBy parameter
        Pageable pageable;
        if (sortBy.equalsIgnoreCase("priceAsc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("price").ascending());
        } else if (sortBy.equalsIgnoreCase("priceDesc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("price").descending());
        } else if (sortBy.equalsIgnoreCase("avgRatingAsc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("avgRating").ascending());
        } else if (sortBy.equalsIgnoreCase("avgRatingDesc")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by("avgRating").descending());
        } else {
            pageable = PageRequest.of(pageNo, pageSize);
        }

        // Retrieve products using a custom specification based on search criteria
        Page<Product> productsPage = productRepository.findAll(
                ProductSpecification.filterProductsByCategorySlug(
                        categorySlug, searchVal, tags, minPrice, maxPrice),
                pageable);

        // Map Product entities to ProductResponseDTOs
        return productsPage.map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            // Map Category to CategoryDTO
            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);
            return productResponseDTO;
        });
    }
    
    @Override
    public List<ProductResponseDTO> getTopProducts(int count) {
        Pageable pageRequest = PageRequest.of(0, count, Sort.by(Sort.Order.desc("avgRating")));
        
        Page<Product> productsPage = productRepository.findAll(pageRequest);
        
        // Map Page<Product> to Page<ProductResponseDTO>
        return productsPage.map(product -> {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            BeanUtils.copyProperties(product, productResponseDTO);

            // Map Category to CategoryProductDTO
            CategoryProductDTO categoryDTO = new CategoryProductDTO();
            BeanUtils.copyProperties(product.getCategory(), categoryDTO);
            productResponseDTO.setCategory(categoryDTO);

            return productResponseDTO;
        }).getContent(); // Return the list of ProductResponseDTO
    }

    @Override
    public List<String> getTagSuggestions(String input) {
        Set<String> allTags = productRepository.findAllTags();
        return allTags.stream()
                      .filter(tag -> tag.toLowerCase().contains(input.toLowerCase()))
                      .collect(Collectors.toList());
    }
}
