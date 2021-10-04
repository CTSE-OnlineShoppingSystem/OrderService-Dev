package com.tutorial.procumentapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.google.android.material.card.MaterialCardView;

public class MainMenu extends AppCompatActivity {

    private MaterialCardView placeOrder;
    private MaterialCardView orderList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_menu);

        // Get the widget reference from XML layout
        placeOrder = findViewById(R.id.orderCardBtn);
        orderList = findViewById(R.id.orderListCardBtn);

        Log.i("TAG", Login.USER_ID );

        // Go to product list if button clicked
        placeOrder.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent placeOrderIntent = new Intent(MainMenu.this, Product_List.class);
                startActivity(placeOrderIntent);
            }
        });

        // Go to my order list if button clicked
        orderList.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent orderListIntent = new Intent(MainMenu.this, Order_List.class);
                startActivity(orderListIntent);
            }
        });

    }
}