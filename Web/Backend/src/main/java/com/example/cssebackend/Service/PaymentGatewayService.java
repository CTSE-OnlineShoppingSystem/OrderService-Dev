package com.example.cssebackend.Service;

import com.example.cssebackend.Model.PaymentDummyDetails;
import com.example.cssebackend.Repository.PaymentGatewayRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentGatewayService {

    private final PaymentGatewayRepository paymentGatewayRepository;

    public PaymentGatewayService(PaymentGatewayRepository paymentGatewayRepository) {
        this.paymentGatewayRepository = paymentGatewayRepository;
    }

    //add-update dummy details
    public void saveDummyDetails(PaymentDummyDetails paymentDummyDetails){
        paymentGatewayRepository.save(paymentDummyDetails);
    }

    //get data from id
    public Object getDummyDetails(String cardNo){
        return paymentGatewayRepository.findById(cardNo);
    }
}
