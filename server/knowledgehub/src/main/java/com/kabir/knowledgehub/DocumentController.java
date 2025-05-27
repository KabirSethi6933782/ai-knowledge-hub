package com.kabir.knowledgehub;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documents")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class DocumentController {

    private final DocumentRepository repo;

    public DocumentController(DocumentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Document> getAllDocuments() {
        return repo.findAll();
    }

    @PostMapping
    public Document createDocument(@RequestBody Document doc) {
        return repo.save(doc);
    }
}
