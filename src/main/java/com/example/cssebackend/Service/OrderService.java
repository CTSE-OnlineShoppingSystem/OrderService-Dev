package com.example.cssebackend.Service;

import com.example.cssebackend.Model.Item;
import com.example.cssebackend.Model.Order;
import com.example.cssebackend.Model.Product;
import com.example.cssebackend.Repository.OrderRepository;
import com.example.cssebackend.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final ProductService productService;

    public OrderService(OrderRepository orderRepository, CartService cartService, ProductRepository productRepository, ProductService productService) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.productService = productService;
    }

    //add order
    public void addOrder(Order order){
        float totPrice =0;
        float priceLimit = 100000;
        for(Item item : order.getItem()){
            totPrice = totPrice + (item.getItemPrice()*item.getQuantity());
            productService.decrementAvailability(item.getItemId(), item.getQuantity());
        }
        if (totPrice >= priceLimit){
            order.setApprovalStatus("Pending");
        }
        else {
            order.setApprovalStatus("Automatically Approved");
        }
        order.setTotal(totPrice);
        order.setPaymentStatus("Pending");
        order.setDeliveryStatus("Pending");
        cartService.deleteCart(order.getVendorId());

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

    //get Single order
    public Object getOrder(String id){
        return orderRepository.findById(id);
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

    //change payment status to approve
    public void approveOrder(String id){
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders){
            if (order.getOrderId().equals(id)){
                order.setApprovalStatus("Approved");
                orderRepository.save(order);
                break;
            }
        }
    }

    //change approve status to reject
    public void rejectOrder(String id){
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders){
            if (order.getOrderId().equals(id)){
                order.setApprovalStatus("Rejected");
                orderRepository.save(order);
                break;
            }
        }
    }

    //create order Id
    public String createOrderId(){
        List<Order> items = orderRepository.findAll();
        String itemId;

        if (items.isEmpty()){
            itemId = "OR" + 1;
        }
        else {
            Order item = items.stream().reduce((first, second) -> second).orElse(null);
            String lastId = item.getOrderId();
            int lastIdNum = Integer.parseInt(lastId.substring(2));
            int size = lastIdNum+1;
            itemId = "OR" + size;
        }

        return itemId;
    }
}
