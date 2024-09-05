package com.project.digitalshop.services.implementation;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.project.digitalshop.services.interfaces.IEmailService;

import java.io.UnsupportedEncodingException;
import java.util.Map;

@Service
public class EmailService implements IEmailService {

    @Value("${spring.mail.username}")
    private String username;

    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;

    public EmailService(JavaMailSender emailSender, TemplateEngine templateEngine) {
        this.emailSender = emailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public boolean sendHtmlMessage(String to, String subject, Map<String, Object> variables, String template) {
        Context context = new Context();
        context.setVariables(variables);

        String htmlContent = templateEngine.process(template, context);

        MimeMessage message = emailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(username, "DigitalShop");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); 
            emailSender.send(message);
            return true; 
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace(); 
            return false; 
        }
    }

    @Override
    public boolean sendSimpleMessage(String to, String subject, String content) {
        MimeMessage message = emailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setFrom(username, "DigitalShop");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, false); 
            emailSender.send(message);
            return true; 
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace(); 
            return false; 
        }
    }
}