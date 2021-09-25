package com.example.cssebackend.Repository;

import com.example.cssebackend.Model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<Payment, String> {
}
