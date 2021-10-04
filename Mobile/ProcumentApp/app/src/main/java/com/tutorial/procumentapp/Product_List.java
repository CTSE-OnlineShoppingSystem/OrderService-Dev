package com.tutorial.procumentapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;

import com.tutorial.procumentapp.models.Product;

import java.util.List;

public class Product_List extends AppCompatActivity implements ProductRecyclerAdapter.OnJobListener {

    private RecyclerView recyclerView;
    private ProductRecyclerAdapter productRecyclerAdapter;

    private List<Product> products;

    // Constant to pass product id with intent
    private static final String KEY = "PRODUCT_ID";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_list);

        initRecyclerView();
    }

    /**
     * This method initialize the recycler view
     */
    private void initRecyclerView() {
        recyclerView = (RecyclerView) findViewById(R.id.product_recycler);

        productRecyclerAdapter = new ProductRecyclerAdapter(getApplicationContext(), products, this);
        recyclerView.setAdapter(productRecyclerAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

    }
    @Override
    public void onItemClick(int position) {
        Intent product = new Intent(Product_List.this, Availability.class);
        product.putExtra(KEY, position);
        product.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(product);
    }


}