package com.project.digitalshop.util;

public class SlugUtils {
    public static String createSlug(String input) {
        if (input == null) {
            return "";
        }
        // Convert to lowercase and replace spaces with hyphens
        String slug = input.trim().toLowerCase().replaceAll("\\s+", "-");
        // Remove special characters except hyphens
        slug = slug.replaceAll("[^a-z0-9\\-]", "");
        return slug;
    }
}
