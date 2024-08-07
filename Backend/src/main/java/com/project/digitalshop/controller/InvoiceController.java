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

import com.project.digitalshop.dto.invoice.InvoiceDTO;
import com.project.digitalshop.dto.invoice.InvoiceResponseDTO;
import com.project.digitalshop.dto.invoice.InvoiceUpdateDTO;
import com.project.digitalshop.services.interfaces.IInvoiceService;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final IInvoiceService invoiceService;

    public InvoiceController(IInvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping
    public ResponseEntity<InvoiceResponseDTO> createInvoice(@Valid @RequestBody InvoiceDTO invoiceDTO) {
        InvoiceResponseDTO createdInvoice = invoiceService.createInvoice(invoiceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdInvoice);
    }

    @PutMapping("/{invoiceId}")
    public ResponseEntity<InvoiceResponseDTO> updateInvoice(@PathVariable UUID invoiceId,
            @Valid @RequestBody InvoiceUpdateDTO invoiceUpdateDTO) {
        InvoiceResponseDTO updatedInvoice = invoiceService.updateInvoice(invoiceId, invoiceUpdateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedInvoice);
    }

    @DeleteMapping("/{invoiceId}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable UUID invoiceId) {
        invoiceService.deleteInvoice(invoiceId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    public ResponseEntity<Page<InvoiceResponseDTO>> getAllInvoice(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<InvoiceResponseDTO> invoicePage = invoiceService.getAllInvoices(pageNo, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(invoicePage);
    }

    @GetMapping("/{invoiceId}")
    public ResponseEntity<InvoiceResponseDTO> getInvoiceById(@PathVariable UUID invoiceId) {
        InvoiceResponseDTO invoiceResponseDTO = invoiceService.getInvoiceById(invoiceId);
        return ResponseEntity.status(HttpStatus.OK).body(invoiceResponseDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<InvoiceResponseDTO>> getInvoiceByUserId(@PathVariable UUID userId,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<InvoiceResponseDTO> invoicePage = invoiceService.getInvoicesByUserId(userId, pageNo, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(invoicePage);
    }
}
