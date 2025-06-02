package com.kabir.knowledgehub;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/documents")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class DocumentController {

    private final DocumentRepository repo;

    public DocumentController(DocumentRepository repo) {
        this.repo = repo;
    }

    // Existing: Get all documents
    @GetMapping
    public List<Document> getAllDocuments() {
        return repo.findAll();
    }

    // Existing: Create document via JSON (keep for now)
    @PostMapping
    public Document createDocument(@RequestBody Document doc) {
        return repo.save(doc);
    }

    // NEW: Upload document with file, title, description, etc.
    @PostMapping("/upload")
    public String uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description
    ) {
        if (file.isEmpty() || title == null || title.trim().isEmpty()) {
            return "File and title are required.";
        }

        try {
            // --- Save file to disk ---
            String uploadDir = "documents/uploads/";
            String originalFileName = file.getOriginalFilename();
            String fileName = System.currentTimeMillis() + "_" + originalFileName;
            String filePath = uploadDir + fileName;

            // Ensure directory exists
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            // Save file
            Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

            // --- Save document metadata to DB ---
            Document doc = new Document();
            doc.setTitle(title);
            doc.setDescription(description);
            doc.setFilePath(filePath);
            doc.setOriginalFileName(originalFileName);
            doc.setSummary(""); // AI summary will be set later

            repo.save(doc);

            return "File uploaded successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed: " + e.getMessage();
        }
    }
}
