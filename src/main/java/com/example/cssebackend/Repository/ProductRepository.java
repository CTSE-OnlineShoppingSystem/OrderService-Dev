package com.example.cssebackend.Repository;

import com.example.cssebackend.Model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}
