package com.project.digitalshop.services.interfaces;

import com.project.digitalshop.dto.invoice.InvoiceDTO;
import com.project.digitalshop.dto.invoice.InvoiceResponseDTO;

import jakarta.validation.Valid;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;

@Validated
public interface IInvoiceService {
    InvoiceResponseDTO createInvoice(@Valid InvoiceDTO invoiceDTO);

    void deleteInvoice(UUID invoiceId);

    InvoiceResponseDTO getInvoiceById(UUID invoiceId);

    Page<InvoiceResponseDTO> getInvoicesByUserId(UUID userId, int pageNo, int pageSize);

    Page<InvoiceResponseDTO> getAllInvoices(int pageNo, int pageSize);
}
