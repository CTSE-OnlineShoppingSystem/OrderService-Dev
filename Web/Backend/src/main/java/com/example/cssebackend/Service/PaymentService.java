package com.example.cssebackend.Service;

import com.example.cssebackend.Model.Payment;
import com.example.cssebackend.Repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderService orderService;

    public PaymentService(PaymentRepository paymentRepository, OrderService orderService) {
        this.paymentRepository = paymentRepository;
        this.orderService = orderService;
    }

    //add Payment and change order payment status.
    public void addPayment(Payment payment){
        paymentRepository.insert(payment);
        orderService.changePaymentStatus(payment.getOrderId());
    }

    //get all payments
    public List<Payment> getAllPayments(){
        return paymentRepository.findAll();
    }

    //create payment Id
    public String createPaymentId(){
        List<Payment> payments = getAllPayments();
        String paymentId;

        if (payments.isEmpty()){
            paymentId = "PA" + 1;
        }
        else {
            Payment item = payments.stream().reduce((first, second) -> second).orElse(null);
            String lastId = item.getPaymentId();
            int lastIdNum = Integer.parseInt(lastId.substring(2));
            int size = lastIdNum+1;
            paymentId = "PA" + size;
        }

        return paymentId;
    }
}
