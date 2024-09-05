package com.project.digitalshop.services.interfaces;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ICloudinaryService {
    public String uploadFile(MultipartFile file, String folderName);

    public List<String> uploadFiles(List<MultipartFile> files, String folderName);

    public void deleteFile(String fileUrl, String folderName);

    public void deleteFiles(List<String> imageUrls, String folderName);
}
