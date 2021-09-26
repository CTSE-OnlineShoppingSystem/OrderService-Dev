package com.example.cssebackend.Service;

import com.example.cssebackend.Model.Payment;
import com.example.cssebackend.Model.Product;
import com.example.cssebackend.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //insert and update product
    public void addProduct(Product product){
        productRepository.save(product);
    }

    //insert product lis
    public void addProducts(Product[] products){
        for (Product product : products){
            productRepository.save(product);
        }
    }

    //delete product
    public void deleteProduct(String productId){
        productRepository.deleteById(productId);
    }

    //get All Products
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    //create payment Id
    public String createProductId(){
        List<Product> products = getAllProducts();
        String paymentId;

        if (products.isEmpty()){
            paymentId = "PR" + 1;
        }
        else {
            Product item = products.stream().reduce((first, second) -> second).orElse(null);
            String lastId = item.getProductId();
            int lastIdNum = Integer.parseInt(lastId.substring(2));
            int size = lastIdNum+1;
            paymentId = "PR" + size;
        }

        return paymentId;
    }
}
