package com.project.digitalshop.services.implementation;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.project.digitalshop.services.interfaces.ICloudinaryService;

import jakarta.annotation.Resource;

@Service
public class CloudinaryService implements ICloudinaryService {

    @Resource
    private Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file, String folderName) {
        try {
            HashMap<String, Object> options = new HashMap<>();
            options.put("folder", folderName);
            options.put("resource_type", "image");
            Map<String, Object> uploadedFile = cloudinary.uploader().upload(file.getBytes(), options);
            String publicId = (String) uploadedFile.get("public_id");
            return cloudinary.url().secure(true).generate(publicId);

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String uploadZipFile(MultipartFile file, String folderName, String publicId) {
        try {
            HashMap<String, Object> options = new HashMap<>();
            options.put("folder", folderName);
            options.put("public_id", publicId);
            options.put("resource_type", "raw");
            options.put("format", "zip");
            Map<String, Object> uploadedFile = cloudinary.uploader().upload(file.getBytes(), options);
            String newpublicId = (String) uploadedFile.get("public_id");
            return cloudinary.url().secure(true).generate(newpublicId);

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<String> uploadFiles(List<MultipartFile> files, String folderName) {
        return files.stream()
                .map(file -> uploadFile(file, folderName))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFile(String fileUrl, String folderName) {
        String publicId = extractPublicIdFromUrl(fileUrl, folderName);
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteFiles(List<String> imageUrls, String folderName) {
        for (String url : imageUrls) {
            String publicId = extractPublicIdFromUrl(url, folderName);
            try {
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    private String extractPublicIdFromUrl(String url, String folderName) {
        String[] urlParts = url.split("/");
        String publicId = urlParts[urlParts.length - 1];
        return folderName + "/" + publicId;
    }
}
