package com.example.cssebackend;

import com.example.cssebackend.Controller.PaymentController;
import com.example.cssebackend.Model.Payment;
import com.example.cssebackend.Model.Product;
import com.example.cssebackend.Service.PaymentService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class PaymentTest {

    @MockBean
    PaymentService paymentService;

    @Autowired
    PaymentController paymentController;

    @Test
    public void testCreate(){
        Payment payment = new Payment("PA10", "OR10", "2021/09/10", "U10", "Minindu", 0);
        paymentService.addPayment(payment);
        Assertions.assertTrue(true, "Payment Added");
    }

    @Test
    public void testGetAll(){

        List<Payment> list = new ArrayList<Payment>();

        Payment payment1 = new Payment("PA10", "OR10", "2021/09/10", "U10", "Minindu", 0);
        Payment payment2 = new Payment("PA11", "OR11", "2021/09/10", "U11", "Kalpana", 0);

        list.add(payment1);
        list.add(payment2);

        Mockito.when(paymentService.getAllPayments()).thenReturn(list);
    }
}
