package com.example.cssebackend.Service;

import com.example.cssebackend.Model.Item;
import com.example.cssebackend.Model.Order;
import com.example.cssebackend.Repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    //add order
    public void addOrder(Order order){
        float totPrice =0;
        float priceLimit = 100000;
        for(Item item : order.getItem()){
            totPrice = totPrice + (item.getItemPrice()*item.getQuantity());
        }
        if (totPrice >= priceLimit){
            order.setApprovalStatus("Pending");
        }
        else {
            order.setApprovalStatus("Automatically Approved");
        }
        order.setTotal(totPrice);
        orderRepository.insert(order);
    }

    //update order
    public void updateOrder(Order order){
        orderRepository.save(order);
    }

    //get All orders
    public List<Order> getAllOrders(){
        List<Order> orders = orderRepository.findAll();
        return orders;
    }

    //get Approved orders
    public List<Order> getApprovedOrders(){
        List<Order> orders = orderRepository.findAll();
        List<Order> finalList = new ArrayList<>();
        for (Order order : orders){
            if (order.getApprovalStatus().equals("Approved")){
                finalList.add(order);
            }
        }
        return finalList;
    }

    //get Pending orders
    public List<Order> getPendingOrders(){
        List<Order> orders = orderRepository.findAll();
        List<Order> finalList = new ArrayList<>();
        for (Order order : orders){
            if (order.getApprovalStatus().equals("Pending")){
                finalList.add(order);
            }
        }
        return finalList;
    }

    //get Automatically Approved orders
    public List<Order> getAutomaticallyApprovedOrders(){
        List<Order> orders = orderRepository.findAll();
        List<Order> finalList = new ArrayList<>();
        for (Order order : orders){
            if (order.getApprovalStatus().equals("Automatically Approved")){
                finalList.add(order);
            }
        }
        return finalList;
    }

    //get Rejected orders
    public List<Order> getRejectedOrders(){
        List<Order> orders = orderRepository.findAll();
        List<Order> finalList = new ArrayList<>();
        for (Order order : orders){
            if (order.getApprovalStatus().equals("Rejected")){
                finalList.add(order);
            }
        }
        return finalList;
    }

    //change payment status of a order
    public void changePaymentStatus(String id){
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders){
            if (order.getOrderId().equals(id)){
                order.setPaymentStatus("Paid");
                orderRepository.save(order);
                break;
            }
        }
    }
}
