package com.tutorial.procumentapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

public class Product_List extends AppCompatActivity implements ProductRecyclerAdapter.OnJobListener {

    public static final String JOB_DETAILS = "JOB";

    final String[] JOB_TITLES = {
            "Senior Software Engineer",
            "IT Business System Analyst",
            "Tech Lead - C# / .Net"
    };

    final String[] COMPANY_NAMES = {
            "Persistent Systems Lanka (Pvt) Ltd",
            "Sri Lankan Airlines Ltd",
            "HCL Technologies Lanka (Pvt) Ltd"
    };

    final String[] POSTED_DATES = {
            "10/09/2021",
            "09/09/2021",
            "09/09/2021"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_list);
        setContentView(R.layout.activity_product_list);
  /*      Button applied_button = (Button) findViewById(R.id.applied_button);*/




    }

    private void initRecyclerView() {
        // initialize
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.product_recycler);

        ProductRecyclerAdapter favJobsRecyclerAdapter = new ProductRecyclerAdapter(getApplicationContext(), JOB_TITLES, COMPANY_NAMES, POSTED_DATES, this);
        recyclerView.setAdapter(favJobsRecyclerAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
    }
    @Override
    public void onItemClick(int position) {

    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {

    }


}