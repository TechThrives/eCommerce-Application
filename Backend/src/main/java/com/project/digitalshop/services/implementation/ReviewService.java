package com.project.digitalshop.services.implementation;

import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.review.ReviewDTO;
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

        ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();
        BeanUtils.copyProperties(review, reviewResponseDTO, "product", "user");
        ReviewUserDTO reviewUserDTO = new ReviewUserDTO();
        BeanUtils.copyProperties(review.getUser(), reviewUserDTO);
        ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
        BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
        return reviewResponseDTO;
    }

    @Override
    public ReviewResponseDTO updateReview(UUID reviewId, ReviewUpdateDTO reviewUpdateDTO) {
        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException("Review Not Found!!!"));

        existingReview.setReviewText(reviewUpdateDTO.getReviewText());
        existingReview.setRating(reviewUpdateDTO.getRating());

        reviewRepository.save(existingReview);

        ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();
        BeanUtils.copyProperties(existingReview, reviewResponseDTO, "product", "user");
        ReviewUserDTO reviewUserDTO = new ReviewUserDTO();
        BeanUtils.copyProperties(existingReview.getUser(), reviewUserDTO);
        ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
        BeanUtils.copyProperties(existingReview.getProduct(), reviewProductDTO);
        return reviewResponseDTO;
    }

    @Override
    public void deleteReview(UUID reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            throw new NotFoundException("Review Not Found!!!");
        }
        reviewRepository.deleteById(reviewId);
    }

    @Override
    public ReviewResponseDTO getReviewById(UUID reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException("Review Not Found!!!"));

        ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();
        BeanUtils.copyProperties(review, reviewResponseDTO, "product", "user");
        ReviewUserDTO reviewUserDTO = new ReviewUserDTO();
        BeanUtils.copyProperties(review.getUser(), reviewUserDTO);
        ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
        BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
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
            ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
            BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
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
            ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
            BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
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
            ReviewProductDTO reviewProductDTO = new ReviewProductDTO();
            BeanUtils.copyProperties(review.getProduct(), reviewProductDTO);
            return reviewResponseDTO;
        });
    }
}
