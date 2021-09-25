package com.example.cssebackend.Controller;

import com.example.cssebackend.Model.Payment;
import com.example.cssebackend.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllPayments(){
        try {
            List<Payment> payments = paymentService.getAllPayments();
            return new ResponseEntity<>(payments, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/id")
    public ResponseEntity<?> createPaymentId(){
        try {
            return new ResponseEntity<>(paymentService.createPaymentId(), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> addPayment(@RequestBody Payment payment){
        try {
            paymentService.addPayment(payment);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
