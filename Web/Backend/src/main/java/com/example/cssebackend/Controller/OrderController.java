package com.example.cssebackend.Controller;

import com.example.cssebackend.Model.Order;
import com.example.cssebackend.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/")
    public ResponseEntity<?> addNewOrder(@RequestBody Order order){
        try {
            orderService.addOrder(order);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllOrders(){
        try {
            List<Order> orders = orderService.getAllOrders();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/pendingOrders")
    public ResponseEntity<?> getPendingOrders(){
        try {
            List<Order> orders = orderService.getPendingOrders();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/approvedOrders")
    public ResponseEntity<?> getApprovedOrders(){
        try {
            List<Order> orders = orderService.getApprovedOrders();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/automaticallyApprovedOrders")
    public ResponseEntity<?> getAutomaticallyApprovedOrders(){
        try {
            List<Order> orders = orderService.getAutomaticallyApprovedOrders();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/rejectedOrders")
    public ResponseEntity<?> getRejectedOrders(){
        try {
            List<Order> orders = orderService.getRejectedOrders();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
