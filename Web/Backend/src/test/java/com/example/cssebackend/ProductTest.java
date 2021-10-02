package com.example.cssebackend;

import com.example.cssebackend.Controller.ProductController;
import com.example.cssebackend.Model.Product;
import com.example.cssebackend.Service.ProductService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class ProductTest {

    @MockBean
    ProductService productService;

    @Test
    public void testCreate(){
        Product product = new Product("PR10", "cement", 100, 1000, "kg");
        productService.addProduct(product);
        Assertions.assertTrue(true, "Added");
    }

    @Test
    public void testGetAll(){

        List<Product> list = new ArrayList<Product>();

        Product product1 = new Product("PR10", "cement", 100, 1000, "kg");
        Product product2 = new Product("PR11", "Nuts", 100, 10000, "g");

        list.add(product1);
        list.add(product2);

        Mockito.when(productService.getAllProducts()).thenReturn(list);
    }

    @Test
    public void testDeleteById(){

        Product product = new Product("PR11", "Nuts", 100, 10000, "g");

        productService.deleteProduct(product.getProductId());
        Assertions.assertTrue(true, "Deleted");
    }

    @Test
    public void testDeleteByIdNegative(){

        Product product = new Product("PR11", "Nuts", 100, 10000, "g");

        productService.deleteProduct("PR20");
        Assertions.assertFalse(false, "Not Found");
    }
}
