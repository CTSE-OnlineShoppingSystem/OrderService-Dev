package com.example.cssebackend.Service;

import com.example.cssebackend.Model.Cart;
import com.example.cssebackend.Model.Item;
import com.example.cssebackend.Repository.CartRepository;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    //get cart by vendor Id
    public Object getCartById(String vendorId){
        return cartRepository.findById(vendorId);
    }

    //create new cart record or update record
    public void addToCart(Cart cart){
        Cart cartItem = new Cart();
        String vendorId = cart.getVendorId();
        List<Cart> cartItems = cartRepository.findAll();

        if(cartItems != null){
            for (Cart cart1 : cartItems){
                if (cart1.getVendorId().equals(vendorId)){
                    cartItem = cart1;
                }
            }
        }

        float totPrice = 0;
        if(cartItem.getVendorId() == null){
            for(Item item : cart.getItem()){
                totPrice = totPrice + (item.getItemPrice()*item.getQuantity());
            }
            cart.setTotal(totPrice);
            cartRepository.insert(cart);
        }
        else{
            List<Item> items = cartItem.getItem();
            for(Item item : cart.getItem()){
                items.add(item);
            }
            for(Item item : items){
                totPrice = totPrice + (item.getItemPrice()*item.getQuantity());
            }

            cartItem.setItem(items);
            cartItem.setTotal(totPrice);
            cartRepository.save(cartItem);
        }
    }

    //remove item from cart
    public void removeItemFromCarta(String vendorId, String itemId){
        Cart cartItem = new Cart();
        List<Cart> cartItems = cartRepository.findAll();
        float totPrice = 0;

        if(cartItems != null){
            for (Cart cart1 : cartItems){
                if (cart1.getVendorId().equals(vendorId)){
                    cartItem = cart1;
                }
            }
        }
        List<Item> items = cartItem.getItem();

        for (Item item : items){
            if (item.getItemId().equals(itemId)){
                items.remove(item);
                break;
            }
        }
        for(Item item : items){
            totPrice = totPrice + (item.getItemPrice()*item.getQuantity());
        }
        cartItem.setTotal(totPrice);
        cartItem.setItem(items);
        cartRepository.save(cartItem);
    }

    //delete cart details
    public void deleteCart(String vendorId){
        cartRepository.deleteById(vendorId);
    }
}
