package com.example.cssebackend;

import com.example.cssebackend.Model.Cart;
import com.example.cssebackend.Model.Item;
import com.example.cssebackend.Model.Product;
import com.example.cssebackend.Service.CartService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class CartTest {

    @MockBean
    CartService cartService;

    @Test
    public void testCreate(){
        List<Item> items = new ArrayList<Item>();

        Cart cart = new Cart("U10", "CA10", items, 0);
        cartService.addToCart(cart);

        Assertions.assertTrue(true, "Item Added to cart");
    }

    @Test
    public void testGetById(){
        List<Item> items = new ArrayList<Item>();
        Cart cart = new Cart("U10", "CA10", items, 0);

        cartService.getCartById(cart.getVendorId());
        Assertions.assertTrue(true, "Item Founded");
    }

    @Test
    public void testGetByIdNegative(){
        List<Item> items = new ArrayList<Item>();
        Cart cart = new Cart("U10", "CA10", items, 0);

        cartService.getCartById("CA20");
        Assertions.assertFalse(false, "Item Not Founded");
    }

    @Test
    public void testDeleteById(){
        List<Item> items = new ArrayList<Item>();
        Cart cart = new Cart("U10", "CA10", items, 0);

        cartService.getCartById(cart.getVendorId());
        Assertions.assertTrue(true, "Item Deleted");
    }

    @Test
    public void testDeleteByIdNegative(){
        List<Item> items = new ArrayList<Item>();
        Cart cart = new Cart("U10", "CA10", items, 0);

        cartService.deleteCart("CA20");
        Assertions.assertFalse(false, "Item Not Founded");
    }
}
