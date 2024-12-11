package com.project.planpulse.service;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Service
public class CloudStorageService {
    private final String bucketName = "plan-pulse-bucket";
    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    public String uploadFile(MultipartFile file, String destination) throws IOException {
        Path destinationPath = Paths.get("/uploads/", destination);
        Files.createDirectories(destinationPath.getParent());
        // save the file to the mounted GCS volume
        Files.write(destinationPath, file.getBytes(), StandardOpenOption.CREATE_NEW);
        // relative path or a logical reference for backend use
        return "/uploads/" + destination;
    }


//    public String uploadFile(MultipartFile file, String destination) throws IOException {
//        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, destination).build();
//        storage.create(blobInfo, file.getBytes());
//        return String.format("https://storage.googleapis.com/%s/%s", bucketName, destination);
//    }

    public ResponseEntity<Resource> downloadFile(String fileName) {
        try {
            Path filePath = Paths.get("/uploads/", fileName);
            if (!Files.exists(filePath)) {
                throw new RuntimeException("File not found: " + fileName);
            }
            Resource fileResource = new ByteArrayResource(Files.readAllBytes(filePath));
            // Determine the MIME type of the file
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream"; // default to binary if MIME type cannot be determined
            }
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .body(fileResource);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file from /uploads/: " + e.getMessage(), e);
        }
    }


//    public Resource downloadFile(String fileName) {
//        try {
//            byte[] fileBytes = storage.readAllBytes(bucketName, fileName);
//            return new ByteArrayResource(fileBytes);
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to download file from storage: " + e.getMessage(), e);
//        }
//    }

    public void deleteFile(String fileName) {
        try {
            Path filePath = Paths.get("/uploads/", fileName);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + fileName, e);
        }
    }


//    public void deleteFile(String fileName) {
//        storage.delete(bucketName, fileName);
//    }
}
