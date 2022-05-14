package com.example.cssebackend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Order")
public class Order {

    @Id
    private String orderId;
    private String modifiedDate;
    private String vendorId;
    private String vendorName;
    private String paymentStatus;
    private String approvalStatus;
    private String deliveryStatus;
    private String deliveryDetails;
    private Item[] item;
    private float total;

    public Order() {
    }

    public Order(String orderId, String modifiedDate, String vendorId, String vendorName, String paymentStatus, String approvalStatus, String deliveryStatus, String deliveryDetails, Item[] item, float total) {
        this.orderId = orderId;
        this.modifiedDate = modifiedDate;
        this.vendorId = vendorId;
        this.vendorName = vendorName;
        this.paymentStatus = paymentStatus;
        this.approvalStatus = approvalStatus;
        this.deliveryStatus = deliveryStatus;
        this.deliveryDetails = deliveryDetails;
        this.item = item;
        this.total = total;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(String modifiedDate) {
        this.modifiedDate = modifiedDate;
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

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public String getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(String deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }

    public String getDeliveryDetails() {
        return deliveryDetails;
    }

    public void setDeliveryDetails(String deliveryDetails) {
        this.deliveryDetails = deliveryDetails;
    }

    public Item[] getItem() {
        return item;
    }

    public void setItem(Item[] item) {
        this.item = item;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }
}

