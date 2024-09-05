package com.project.digitalshop.services.interfaces;

import java.util.Map;

public interface IEmailService {
    boolean sendHtmlMessage(String to, String subject, Map<String, Object> variables, String template);

    boolean sendSimpleMessage(String to, String subject, String content);
}
