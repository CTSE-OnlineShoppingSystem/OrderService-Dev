package com.example.cssebackend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Payment")
public class Payment {

    @Id
    private String paymentId;
    private String orderId;
    private String date;
    private String vendorId;
    private String vendorName;
    private float totalAmount;

    public Payment() {
    }

    public Payment(String paymentId, String orderId, String date, String vendorId, String vendorName, float totalAmount) {
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.date = date;
        this.vendorId = vendorId;
        this.vendorName = vendorName;
        this.totalAmount = totalAmount;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }
}
