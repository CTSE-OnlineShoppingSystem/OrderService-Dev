package com.example.cssebackend.Controller;

import com.example.cssebackend.Model.PaymentDummyDetails;
import com.example.cssebackend.Service.PaymentGatewayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/paymentDummy")
public class PaymentDummyController {

    @Autowired
    private final PaymentGatewayService paymentGatewayService;

    public PaymentDummyController(PaymentGatewayService paymentGatewayService) {
        this.paymentGatewayService = paymentGatewayService;
    }

    @PostMapping("/")
    public ResponseEntity<?> addPaymentDummy(@RequestBody PaymentDummyDetails paymentDummyDetails){
        try {
            paymentGatewayService.saveDummyDetails(paymentDummyDetails);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> updatePaymentDummy(@RequestBody PaymentDummyDetails paymentDummyDetails){
        try {
            paymentGatewayService.saveDummyDetails(paymentDummyDetails);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{cardNo}")
    public ResponseEntity<?> getDummyDetails(@PathVariable String cardNo){
        try {
            return new ResponseEntity<>(paymentGatewayService.getDummyDetails(cardNo), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
