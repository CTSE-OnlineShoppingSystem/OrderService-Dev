package com.example.cssebackend.Repository;

import com.example.cssebackend.Model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
}
