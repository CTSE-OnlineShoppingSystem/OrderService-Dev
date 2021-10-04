package com.tutorial.procumentapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Availability extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_availability);

        Button addtocartbtn = (Button) findViewById(R.id.addt_to_cart_btn);

        addtocartbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent INT=new Intent(Availability.this,Purchased_Order_Details.class);
                INT.putExtra("hi", "HI");
                startActivity(INT);
            }
        });

    }
}