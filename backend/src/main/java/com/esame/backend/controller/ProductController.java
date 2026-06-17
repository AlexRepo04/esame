package com.esame.backend.controller;

import com.esame.backend.dto.GenericResponse;
import com.esame.backend.dto.ProductRequest;
import com.esame.backend.model.Product;
import com.esame.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<GenericResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        productService.saveProduct(request);
        return ResponseEntity.ok(GenericResponse.ok("Prodotto creato con successo!"));
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GenericResponse> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(GenericResponse.ok("Prodotto eliminato con successo!"));
    }
}
