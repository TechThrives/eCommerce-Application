package com.project.digitalshop.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.digitalshop.dto.review.ReviewDTO;
import com.project.digitalshop.dto.review.ReviewResponseDTO;
import com.project.digitalshop.dto.review.ReviewUpdateDTO;
import com.project.digitalshop.services.interfaces.IReviewService;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/reviews")
public class ReviewController {

    private final IReviewService reviewService;

    public ReviewController(IReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewResponseDTO> createReview(@Valid @RequestBody ReviewDTO reviewDTO) {
        ReviewResponseDTO createdReview = reviewService.createReview(reviewDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReview);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponseDTO> updateReview(@PathVariable UUID reviewId,
            @Valid @RequestBody ReviewUpdateDTO reviewUpdateDTO) {
        ReviewResponseDTO updatedReview = reviewService.updateReview(reviewId, reviewUpdateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedReview);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable UUID reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    public ResponseEntity<Page<ReviewResponseDTO>> getAllReviews(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<ReviewResponseDTO> reviewPage = reviewService.getAllReviews(pageNo, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(reviewPage);
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewResponseDTO> getReviewById(@PathVariable UUID reviewId) {
        ReviewResponseDTO reviewResponseDTO = reviewService.getReviewById(reviewId);
        return ResponseEntity.status(HttpStatus.OK).body(reviewResponseDTO);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Page<ReviewResponseDTO>> getReviewsByProductId(@PathVariable UUID productId,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<ReviewResponseDTO> reviewPage = reviewService.getReviewsByProductId(productId, pageNo, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(reviewPage);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<ReviewResponseDTO>> getReviewsByUserId(@PathVariable UUID userId,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<ReviewResponseDTO> reviewPage = reviewService.getReviewsByUserId(userId, pageNo, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(reviewPage);
    }
}
