package com.project.digitalshop.services.interfaces;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.review.ReviewDTO;
import com.project.digitalshop.dto.review.ReviewResponseDTO;
import com.project.digitalshop.dto.review.ReviewUpdateDTO;

@Validated
public interface IReviewService {
    ReviewResponseDTO createReview(ReviewDTO reviewDTO);

    ReviewResponseDTO updateReview(UUID reviewId, ReviewUpdateDTO reviewUpdateDTO);

    void deleteReview(UUID reviewId);

    ReviewResponseDTO getReviewById(UUID reviewId);

    Page<ReviewResponseDTO> getReviewsByProductId(UUID productId, int pageNo, int pageSize);

    Page<ReviewResponseDTO> getReviewsByUserId(UUID userId, int pageNo, int pageSize);

    Page<ReviewResponseDTO> getAllReviews(int pageNo, int pageSize);
}
