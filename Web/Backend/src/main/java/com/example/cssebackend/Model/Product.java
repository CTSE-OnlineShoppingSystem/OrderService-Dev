package com.example.cssebackend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Product")
public class Product {

    @Id
    private String productId;
    private String productName;
    private float productPrice;
    private float availability;
    private String unit;

    public Product() {
    }

    public Product(String productId, String productName, float productPrice, float availability, String unit) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.availability = availability;
        this.unit = unit;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public float getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(float productPrice) {
        this.productPrice = productPrice;
    }

    public float getAvailability() {
        return availability;
    }

    public void setAvailability(float availability) {
        this.availability = availability;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
