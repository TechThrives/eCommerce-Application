package com.project.digitalshop.services.interfaces;

import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.checkout.Checkout;
import com.project.digitalshop.dto.checkout.CheckoutDTO;
import com.project.digitalshop.dto.invoice.InvoiceDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

@Validated
public interface IStripeService {
    Session createSession(CheckoutDTO checkoutDTO) throws StripeException;

    InvoiceDTO getInvoice(Checkout checkout) throws StripeException;
}
