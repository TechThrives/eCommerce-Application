package com.project.digitalshop.controller;

import com.project.digitalshop.dto.checkout.CheckoutDTO;
import com.project.digitalshop.dto.checkout.Checkout;
import com.project.digitalshop.services.interfaces.IStripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/checkout")
public class StripeController {

    private final IStripeService stripeService;

    public StripeController(IStripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Checkout> createCheckoutSession(@RequestBody CheckoutDTO checkoutDTO) throws StripeException {
        Session session = stripeService.createSession(checkoutDTO);
        Checkout checkoutResponse = new Checkout();
        checkoutResponse.setSessionId(session.getId());
        return ResponseEntity.status(HttpStatus.OK).body(checkoutResponse);
    }
    
}
