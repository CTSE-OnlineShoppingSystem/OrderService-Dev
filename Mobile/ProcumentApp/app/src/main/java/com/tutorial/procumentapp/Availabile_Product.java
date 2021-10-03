package com.tutorial.procumentapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Availabile_Product extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_availabile_product);

        Button addtocartbtn = (Button) findViewById(R.id.addt_to_cart_btn);

        addtocartbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent INT=new Intent(Availabile_Product.this,Purchased_Order_Details.class);
                INT.putExtra("hi", "HI");
                startActivity(INT);
            }
        });

    }
}