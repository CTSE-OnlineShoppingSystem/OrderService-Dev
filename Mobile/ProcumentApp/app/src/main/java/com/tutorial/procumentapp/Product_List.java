package com.tutorial.procumentapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.tutorial.procumentapp.models.Product;
import com.tutorial.procumentapp.utils.ApiService;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class Product_List extends AppCompatActivity implements ProductRecyclerAdapter.OnJobListener {

    private RecyclerView recyclerView;
    private ProductRecyclerAdapter productRecyclerAdapter;
    private Context mContext;

    private List<Product> products;

    // Constant to pass product id with intent
    private final String KEY = "PRODUCT_ID";
    // Constant for REST API for Product list
    private final String BASE_URL = "https://csse-procurement-backend.herokuapp.com/product/";
    // Constant for Logcat identification
    private final String TAG = "PRODUCTS: ";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_list);

        // Get the application context
        mContext = getApplicationContext();

        // Get the widget reference from XML layout
        recyclerView = findViewById(R.id.product_recycler);

        // Initializing product list
        products = new ArrayList<>();

        getDataFromRequest();

        initRecyclerView();
    }

    /**
     * This method initialize the recycler view
     */
    private void initRecyclerView() {

        // Set the adapter and product list to recycler view
        productRecyclerAdapter = new ProductRecyclerAdapter(getApplicationContext(), products, this);
        recyclerView.setAdapter(productRecyclerAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    /**
     * This method will redirect user to the availability page with relevant data
     * when the item is clicked
     * @param position - identify which item was selected
     */
    @Override
    public void onItemClick(int position) {
        Intent product = new Intent(Product_List.this, Availability.class);
        product.putExtra(KEY, position);
        product.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(product);
    }

    /**
     * This method used to fetch product list from the REST API
     */
    public void getDataFromRequest() {

            JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                    Request.Method.GET,
                    BASE_URL,
                    null,
                    new Response.Listener<JSONArray>() {
                        @Override
                        public void onResponse(JSONArray response) {
                            Log.i(TAG, response.toString());

                            //Retrieve each response object and add it to the ArrayList
                            for (int i = 0; i < response.length(); i++) {
                                try {
                                    JSONObject productObject = response.getJSONObject(i);

                                    Product product = new Product();
                                    product.setProductId(productObject.getString("productId"));
                                    product.setProductName(productObject.getString("productName"));
                                    product.setProductPrice((Double) productObject.get("productPrice"));
                                    product.setAvailability((Double) productObject.get("availability"));
                                    product.setUnit(productObject.getString("unit"));

                                    products.add(product);

                                    System.out.println(product.getProductName());

                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.e(TAG, error.getMessage());
                        }
                    }
            );

            // Add the request to the RequestQueue
            ApiService.getInstance(mContext).addToRequestQueue(jsonArrayRequest);

    }

}