package com.example.cssebackend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Cart")
public class Cart {

    @Id
    private String vendorId;
    private String cartId;
    private List<Item> item;
    private float total;

    public Cart() {
    }

    public Cart(String vendorId, String cartId, List<Item> item, float total) {
        this.vendorId = vendorId;
        this.cartId = cartId;
        this.item = item;
        this.total = total;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public List<Item> getItem() {
        return item;
    }

    public void setItem(List<Item> item) {
        this.item = item;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }
}
