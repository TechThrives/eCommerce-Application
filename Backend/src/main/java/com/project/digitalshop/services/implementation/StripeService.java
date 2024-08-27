package com.project.digitalshop.services.implementation;

import com.project.digitalshop.dto.checkout.Checkout;
import com.project.digitalshop.dto.checkout.CheckoutDTO;
import com.project.digitalshop.dto.invoice.InvoiceDTO;
import com.project.digitalshop.exception.NotFoundException;
import com.project.digitalshop.model.PaymentStatus;
import com.project.digitalshop.model.Product;
import com.project.digitalshop.model.User;
import com.project.digitalshop.repository.ProductRepository;
import com.project.digitalshop.repository.UserRepository;
import com.project.digitalshop.services.interfaces.IStripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerListParams;
import com.stripe.param.PaymentIntentRetrieveParams;
import com.stripe.param.checkout.SessionCreateParams;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.Arrays;
import java.util.stream.Collectors;

@Service
@Validated
public class StripeService implements IStripeService {

    @Value("${base.url}")
    private String baseURL;

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public StripeService(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    private List<Product> fetchProductsByIds(List<UUID> productIds) {
        List<Product> products = new ArrayList<>();
        for (UUID productId : productIds) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new NotFoundException("Product Not Found!!!"));
            products.add(product);
        }
        return products;
    }

    private SessionCreateParams.LineItem.PriceData createPriceData(Product product, BigDecimal taxRate) {
        // Convert the product price to the smallest unit of INR (paise)
        BigDecimal unitAmount = product.getPrice().multiply(new BigDecimal("100")); // Price in paise

        // Calculate the tax amount
        BigDecimal taxAmount = unitAmount.multiply(taxRate).setScale(0, RoundingMode.HALF_UP);

        // Calculate the total price including tax
        BigDecimal unitAmountWithTax = unitAmount.add(taxAmount);

        // Convert to long for Stripe (since Stripe requires amounts in the smallest unit)
        long unitAmountWithTaxInPaise = unitAmountWithTax.longValueExact();
        
        // Return the price data with currency INR and the amount including tax
        return SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("inr")
                .setUnitAmount(unitAmountWithTaxInPaise)
                .setProductData(
                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .addImage(product.getImageUrls().get(0))
                                .setName(product.getName())
                                .build())
                .build();
    }

    // Create a session line item for each product
    private SessionCreateParams.LineItem createSessionLineItem(Product product, int quantity, BigDecimal taxRate) {
        return SessionCreateParams.LineItem.builder()
                .setPriceData(createPriceData(product, taxRate))
                .setQuantity((long) quantity)
                .build();
    }

    public Customer getOrCreateCustomer(User user) throws StripeException {
        // 1. Search for the customer by email
        CustomerListParams params = CustomerListParams.builder()
                .setEmail(user.getEmail())
                .setLimit(1L)
                .build();

        CustomerCollection customers = Customer.list(params);
        Customer customer;

        if (customers.getData().isEmpty()) {
            // 2. If customer does not exist, create a new one
            CustomerCreateParams customerParams = CustomerCreateParams.builder()
                    .setName(user.getFirstName() + " " + user.getLastName())
                    .setEmail(user.getEmail())
                    .setPhone(user.getPhoneNumber())
                    .setDescription("New customer created through API")
                    .build();
            customer = Customer.create(customerParams);
        } else {
            // 3. If customer exists, use the existing customer
            customer = customers.getData().get(0);
        }

        return customer;
    }

    @Override
    public Session createSession(CheckoutDTO checkoutDTO) throws StripeException {

        User user = userRepository.findById(checkoutDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("User Not Found!!!"));

        List<Product> products = fetchProductsByIds(checkoutDTO.getProductIds());

        String successURL = baseURL + "/payment-success?session_id={CHECKOUT_SESSION_ID}";

        List<SessionCreateParams.LineItem> sessionItemsList = new ArrayList<>();

        // Build the session line items
        for (Product product : products) {
            sessionItemsList.add(createSessionLineItem(product, 1, checkoutDTO.getTax())); // Assuming quantity of 1 per product
        }

        Customer customer = getOrCreateCustomer(user);

        String productIds = products.stream()
                .map(Product::getId)
                .map(UUID::toString)
                .collect(Collectors.joining(","));

        // Set Metadata from CheckoutDTO
        Map<String, String> metadata = new HashMap<>();
        metadata.put("userId", user.getId().toString());
        metadata.put("productIds", productIds);
        metadata.put("subTotal", String.valueOf(checkoutDTO.getSubTotal()));
        metadata.put("tax", String.valueOf(checkoutDTO.getTax()));
        metadata.put("grandTotal", String.valueOf(checkoutDTO.getGrandTotal()));

        // Create the session parameters
        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                // .addPaymentMethodType(SessionCreateParams.PaymentMethodType.AMAZON_PAY)
                // .addPaymentMethodType(SessionCreateParams.PaymentMethodType.GOOGLE_PAY)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCurrency("inr") // Set currency to INR
                .setCustomer(customer.getId())
                .addAllLineItem(sessionItemsList)
                .putAllMetadata(metadata)
                .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
                .setReturnUrl(successURL)
                .build();

        // Create and return the Stripe session
        return Session.create(params);
    }

    @Override
    public InvoiceDTO getInvoice(Checkout checkout) throws StripeException {
        Session session = Session.retrieve(checkout.getSessionId());

        Map<String, String> metadata = session.getMetadata();
        List<UUID> productIds = Arrays.stream(metadata.get("productIds").split(","))
                .map(UUID::fromString)
                .collect(Collectors.toList());
        InvoiceDTO invoiceDTO = new InvoiceDTO();
        invoiceDTO.setUserId(UUID.fromString(metadata.get("userId")));
        invoiceDTO.setSessionId(checkout.getSessionId());
        invoiceDTO.setSubTotal(new BigDecimal(metadata.get("subTotal")));
        invoiceDTO.setProductIds(productIds);
        invoiceDTO.setTax(new BigDecimal(metadata.get("tax")));
        invoiceDTO.setTotalPrice(new BigDecimal(metadata.get("grandTotal")));
        invoiceDTO.setPaymentStatus(mapPaymentStatus(session));
        PaymentIntentRetrieveParams params = PaymentIntentRetrieveParams.builder()
                .build();
        PaymentIntent paymentIntent = PaymentIntent.retrieve(session.getPaymentIntent(), params, null);
        String paymentMethodId = paymentIntent.getPaymentMethod();
        PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentMethodId);
        invoiceDTO.setPaymentMethod(mapPaymentMethod(paymentMethod));
        return invoiceDTO;
    }

    public PaymentStatus mapPaymentStatus(Session session) {
        switch (session.getPaymentStatus()) {
            case "paid":
                return PaymentStatus.SUCCESS;
            case "unpaid":
                return PaymentStatus.FAILED;
            case "no_payment_required":
                return PaymentStatus.PENDING;
            default:
                return PaymentStatus.FAILED;
        }
    }

    public com.project.digitalshop.model.PaymentMethod mapPaymentMethod(PaymentMethod paymentMethod) {
        switch (paymentMethod.getType()) {
            case "card":
                return com.project.digitalshop.model.PaymentMethod.CARD;
            case "google_pay":
                return com.project.digitalshop.model.PaymentMethod.GOOGLE_PAY;
            case "amazon_pay":
                return com.project.digitalshop.model.PaymentMethod.AMAZON_PAY;
            default:
                return com.project.digitalshop.model.PaymentMethod.NONE;
        }
    }
}