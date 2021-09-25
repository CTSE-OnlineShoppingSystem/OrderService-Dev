package com.example.cssebackend.Repository;

import com.example.cssebackend.Model.PaymentDummyDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentGatewayRepository extends MongoRepository<PaymentDummyDetails, String> {
}
