package com.tutorial.procumentapp;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.snackbar.Snackbar;
import com.tutorial.procumentapp.utils.ApiService;

import org.json.JSONException;
import org.json.JSONObject;

public class Login extends AppCompatActivity {

    private EditText userid;
    private EditText password;
    private Button login;

    private String user_id;
    private String user_pwd;

    private Context mContext;

    // Constant for REST API for User
    private final String BASE_URL = "https://csse-procurement-backend.herokuapp.com/user/";
    // Constant for user_role
    private final String USER_ROLE = "Site Manager";
    // Static variable to read UserId across the app
    public static String USER_ID = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Get the application context
        mContext = getApplicationContext();

        // Get the widget reference from XML layout
        userid = findViewById(R.id.userid);
        password = findViewById(R.id.password);
        login = findViewById(R.id.btnSignIn);

        // Set a click listener for button widget
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                // if true, proceed to login function
                if (isValid()) {
                    LoginUser();
                }
            }
        });

    }


    /**
     * This method checks if the user id or password is empty,
     * and if they are empty the editText filed will prompt an error.
     *
     * @return - returns a boolean according to the result
     */
    private boolean isValid() {
        user_id = userid.getText().toString().trim();
        user_pwd = password.getText().toString().trim();

        if (TextUtils.isEmpty(user_id)) {
            userid.setError("User id cannot be empty");
            userid.requestFocus();
            return false;

        } else if (TextUtils.isEmpty(user_pwd)) {
            password.setError("Password cannot be empty");
            password.requestFocus();
            return false;

        } else {
            return true;
        }
    }

    /**
     * This method authenticate the user and sign in the user
     */
    private void LoginUser() {

        // Initialize a new Request to fetch a user
        JsonObjectRequest request = new JsonObjectRequest(
                Request.Method.GET,
                BASE_URL + user_id,
                null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        // correct user_id and user fetched
                        Log.i("onResponse: USER", response.toString());

                        try {
                            // check if the password is correct
                            if (response.get("password").toString().equals(user_pwd)) {
                                Log.i("LOGIN: ", "Valid password");

                                // check if the user is authorized
                                if (response.get("userRole").toString().equals(USER_ROLE)) {
                                    Log.i("AUTH: ", "Authorized");
                                    USER_ID = response.get("userId").toString();
                                    Toast.makeText(mContext, "Login successful", Toast.LENGTH_SHORT).show();

                                    //redirect to home
                                    startActivity(new Intent(Login.this, MainMenu.class));

                                } else {
                                    Log.e("AUTH: ", "Not Authorized");
                                    Toast.makeText(mContext, "Not Authorized", Toast.LENGTH_SHORT).show();
                                }

                            } else {
                                Log.e("LOGIN: ", "Invalid password");
                                Toast.makeText(mContext, "Invalid credentials", Toast.LENGTH_SHORT).show();
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.e("onResponse: USER", error.toString());
                        Toast.makeText(mContext, "Login failed", Toast.LENGTH_SHORT).show();
                    }
                }
        );

        // Add the request to the RequestQueue
        ApiService.getInstance(mContext).addToRequestQueue(request);
    }


}