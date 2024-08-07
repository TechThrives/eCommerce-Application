package com.project.digitalshop.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.ui.Model;
import jakarta.servlet.http.HttpServletRequest;

@Controller
@Tag(name="Home", description = "Home Page")
public class MainController {
    @GetMapping("/")
    public String home(@NonNull HttpServletRequest request, Model model) {
        String serverURL = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        model.addAttribute("serverURL", serverURL);
        return "home";
    }

}
