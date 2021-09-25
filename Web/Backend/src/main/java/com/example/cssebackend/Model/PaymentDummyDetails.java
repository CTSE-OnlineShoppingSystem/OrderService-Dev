package com.example.cssebackend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("PaymentDetails")
public class PaymentDummyDetails {

    @Id
    private String cardNo;
    private int secretNo;
    private float balance;

    public PaymentDummyDetails() {
    }

    public PaymentDummyDetails(String cardNo, int secretNo, float balance) {
        this.cardNo = cardNo;
        this.secretNo = secretNo;
        this.balance = balance;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public int getSecretNo() {
        return secretNo;
    }

    public void setSecretNo(int secretNo) {
        this.secretNo = secretNo;
    }

    public float getBalance() {
        return balance;
    }

    public void setBalance(float balance) {
        this.balance = balance;
    }
}
