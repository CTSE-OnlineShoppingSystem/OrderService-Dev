package com.example.cssebackend.Service;

import com.example.cssebackend.Model.Product;
import com.example.cssebackend.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //insert and update product
    public void addProduct(Product[] products){
        for (Product product : products){
            productRepository.save(product);
        }
    }

    //delete product
    public void deleteProduct(String productId){
        productRepository.deleteById(productId);
    }

    //get All Products
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }
}
