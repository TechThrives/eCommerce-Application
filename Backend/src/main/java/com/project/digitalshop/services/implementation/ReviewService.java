package com.project.digitalshop.services.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.product.ProductResponseDTO;
import com.project.digitalshop.dto.review.ProductReviewSummaryDTO;
import com.project.digitalshop.dto.review.ReviewDTO;
import com.project.digitalshop.dto.review.ReviewDistributionDTO;
import com.project.digitalshop.dto.review.ReviewProductDTO;
import com.project.digitalshop.dto.review.ReviewResponseDTO;
import com.project.digitalshop.dto.review.ReviewUpdateDTO;
import com.project.digitalshop.dto.review.ReviewUserDTO;
import com.project.digitalshop.exception.NotFoundException;
import com.project.digitalshop.model.Product;
import com.project.digitalshop.model.Review;
import com.project.digitalshop.model.User;
import com.project.digitalshop.repository.ProductRepository;
import com.project.digitalshop.repository.ReviewRepository;
import com.project.digitalshop.repository.UserRepository;
import com.project.digitalshop.services.interfaces.IReviewService;

@Service
@Validated
public class ReviewService implements IReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository,
            ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    public ReviewResponseDTO createReview(ReviewDTO reviewDTO) {
        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("User Not Found!!!"));
        Product product = productRepository.findById(reviewDTO.getProductId())
                .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));
        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReviewText(reviewDTO.getReviewText());
        review.setRating(reviewDTO.getRating());
        review = reviewRepository.save(review);
        product.incrementReviewCount();
        float avgRating = calculateAverageRating(product);
        product.setAvgRating(avgRating);
        product = productRepository.save(product);

        ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();
        BeanUtils.copyProperties(review, reviewResponseDTO, "product", "user");
        ReviewUserDTO reviewUserDTO = new ReviewUserDTO();
        BeanUtils.copyProperties(review.getUser(), reviewUserDTO);
        reviewResponseDTO.setUser(reviewUserDTO);
        ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
        BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
        reviewResponseDTO.setProduct(reviewProductDTO);
        return reviewResponseDTO;
    }

    @Override
    public ReviewResponseDTO updateReview(UUID reviewId, ReviewUpdateDTO reviewUpdateDTO) {
        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException("Review Not Found!!!"));

        existingReview.setReviewText(reviewUpdateDTO.getReviewText());
        existingReview.setRating(reviewUpdateDTO.getRating());

        reviewRepository.save(existingReview);
        Product product = existingReview.getProduct();
        float avgRating = calculateAverageRating(product);
        product.setAvgRating(avgRating);

        ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();
        BeanUtils.copyProperties(existingReview, reviewResponseDTO, "product", "user");
        ReviewUserDTO reviewUserDTO = new ReviewUserDTO();
        BeanUtils.copyProperties(existingReview.getUser(), reviewUserDTO);
        reviewResponseDTO.setUser(reviewUserDTO);
        ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
        BeanUtils.copyProperties(existingReview.getProduct(), reviewProductDTO);
        reviewResponseDTO.setProduct(reviewProductDTO);
        return reviewResponseDTO;
    }

    @Override
    public void deleteReview(UUID reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            throw new NotFoundException("Review Not Found!!!");
        }

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException("Review Not Found!!!"));

        reviewRepository.deleteById(reviewId);
        
        Product product = review.getProduct();
        product.decrementReviewCount();
        float avgRating = calculateAverageRating(product);
        product.setAvgRating(avgRating);
        productRepository.save(product);
    }

    @Override
    public ReviewResponseDTO getReviewById(UUID reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException("Review Not Found!!!"));

        ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();
        BeanUtils.copyProperties(review, reviewResponseDTO, "product", "user");
        ReviewUserDTO reviewUserDTO = new ReviewUserDTO();
        BeanUtils.copyProperties(review.getUser(), reviewUserDTO);
        reviewResponseDTO.setUser(reviewUserDTO);
        ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
        BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
        reviewResponseDTO.setProduct(reviewProductDTO);
        return reviewResponseDTO;
    }

    @Override
    public Page<ReviewResponseDTO> getReviewsByProductId(UUID productId, int pageNo, int pageSize) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Review> reviewPage = reviewRepository.findByProduct(product, pageable);

        return reviewPage.map(review -> {
            ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();
            BeanUtils.copyProperties(review, reviewResponseDTO, "product", "user");
            ReviewUserDTO reviewUserDTO = new ReviewUserDTO();
            BeanUtils.copyProperties(review.getUser(), reviewUserDTO);
            reviewResponseDTO.setUser(reviewUserDTO);
            ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
            BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
            reviewResponseDTO.setProduct(reviewProductDTO);
            return reviewResponseDTO;
        });
    }

    @Override
    public Page<ReviewResponseDTO> getReviewsByProductSlug(String productSlug, int pageNo, int pageSize) {
        Product product = productRepository.findBySlug(productSlug)
                .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Review> reviewPage = reviewRepository.findByProduct(product, pageable);

        return reviewPage.map(review -> {
            ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();
            BeanUtils.copyProperties(review, reviewResponseDTO, "product", "user");
            ReviewUserDTO reviewUserDTO = new ReviewUserDTO();
            BeanUtils.copyProperties(review.getUser(), reviewUserDTO);
            reviewResponseDTO.setUser(reviewUserDTO);
            ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
            BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
            reviewResponseDTO.setProduct(reviewProductDTO);
            return reviewResponseDTO;
        });
    }

    @Override
    public Page<ReviewResponseDTO> getReviewsByUserId(UUID userId, int pageNo, int pageSize) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User Not Found!!!"));
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Review> reviewPage = reviewRepository.findByUser(user, pageable);

        return reviewPage.map(review -> {
            ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();
            BeanUtils.copyProperties(review, reviewResponseDTO, "product", "user");
            ReviewUserDTO reviewUserDTO = new ReviewUserDTO();
            BeanUtils.copyProperties(review.getUser(), reviewUserDTO);
            reviewResponseDTO.setUser(reviewUserDTO);
            ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
            BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
            reviewResponseDTO.setProduct(reviewProductDTO);
            return reviewResponseDTO;
        });
    }

    @Override
    public Page<ReviewResponseDTO> getAllReviews(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Review> reviewPage = reviewRepository.findAll(pageable);

        return reviewPage.map(review -> {
            ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();
            BeanUtils.copyProperties(review, reviewResponseDTO, "product", "user");
            ReviewUserDTO reviewUserDTO = new ReviewUserDTO();
            BeanUtils.copyProperties(review.getUser(), reviewUserDTO);
            reviewResponseDTO.setUser(reviewUserDTO);
            ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
            BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
            reviewResponseDTO.setProduct(reviewProductDTO);
            return reviewResponseDTO;
        });
    }

    public float calculateAverageRating(Product product) {
        return reviewRepository.findAverageRatingByProductId(product.getId());
    }

    @Override
    public ProductReviewSummaryDTO getProductReviewSummary(String productSlug) {
        Product product = productRepository.findBySlug(productSlug)
                .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));
                
        long totalReviews = reviewRepository.countByProductId(product.getId());

        float avgRating = calculateAverageRating(product);

        List<ReviewDistributionDTO> distribution = new ArrayList<>();

        // Create buckets for ratings from 5 to 1
        for (int i = 5; i >= 1; i--) {
            long count = reviewRepository.countByProductIdAndRatingRange(product.getId(), i - 0.5, i + 0.5);
            String percentage = totalReviews > 0 ? String.format("%.0f", ((double) count / totalReviews) * 100) : "0";

            distribution.add(new ReviewDistributionDTO(i, count, percentage));
        }

        ProductResponseDTO productResponse = new ProductResponseDTO();
        BeanUtils.copyProperties(product, productResponse);

        ProductReviewSummaryDTO summary = new ProductReviewSummaryDTO();
        summary.setReviewCount(totalReviews);
        summary.setAvgRating(avgRating);
        summary.setProduct(productResponse);
        summary.setReviewDistribution(distribution);

        return summary;
    }
}
