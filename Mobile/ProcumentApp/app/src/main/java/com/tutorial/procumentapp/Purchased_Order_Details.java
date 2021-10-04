package com.tutorial.procumentapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Purchased_Order_Details extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_purchased_order_details);

        Button savebtn = (Button) findViewById(R.id.save_btn);

        savebtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent INT=new Intent(Purchased_Order_Details.this,Order_List.class);
                INT.putExtra("hi", "HI");
                startActivity(INT);
            }
        });
    }
}