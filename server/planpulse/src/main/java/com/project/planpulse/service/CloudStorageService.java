package com.project.planpulse.service;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class CloudStorageService {
    private final String bucketName = "plan-pulse-bucket";
    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    public String uploadFile(MultipartFile file, String destination) throws IOException {
        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, destination).build();
        storage.create(blobInfo, file.getBytes());
        return String.format("https://storage.googleapis.com/%s/%s", bucketName, destination);
    }

    public Resource downloadFile(String fileName) {
        try {
            byte[] fileBytes = storage.readAllBytes(bucketName, fileName);
            return new ByteArrayResource(fileBytes);
        } catch (Exception e) {
            throw new RuntimeException("Failed to download file from storage: " + e.getMessage(), e);
        }
    }

    public void deleteFile(String fileName) {
        storage.delete(bucketName, fileName);
    }
}
