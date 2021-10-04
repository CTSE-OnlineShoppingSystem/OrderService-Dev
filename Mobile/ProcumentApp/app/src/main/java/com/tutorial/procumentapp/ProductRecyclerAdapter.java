package com.tutorial.procumentapp;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.card.MaterialCardView;
import com.tutorial.procumentapp.models.Product;

import java.util.List;

public class ProductRecyclerAdapter extends RecyclerView.Adapter<ProductRecyclerAdapter.ViewHolder> {

    private final Context context;
    private List<Product> productList;
    private final OnJobListener jobListener;

    public ProductRecyclerAdapter(Context context, List<Product> productList, OnJobListener jobListener) {
        this.context = context;
        this.productList = productList;
        this.jobListener = jobListener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        //instantiate the view
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.product_item, parent, false);
        return new ViewHolder(view, jobListener);
    }

    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        // set data to the recycling item
        Product resultItem = productList.get(position);

        holder.productName.setText(resultItem.getProductName());
        holder.qty.setText("QTY: " + resultItem.getAvailability());

        if (resultItem.getAvailability() > 0) {
            holder.availability.setText("In Stock");
        } else {
            holder.availability.setText("Out of Stock");
        }

    }

    @Override
    public int getItemCount() {
        return productList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        MaterialCardView materialCardView;
        TextView productName;
        TextView qty;
        TextView availability;
        OnJobListener onJobListener;

        public ViewHolder(@NonNull View itemView, OnJobListener onJobListener) {
            super(itemView);

            materialCardView = (MaterialCardView) itemView.findViewById(R.id.product_card_layout);
            productName = (TextView) itemView.findViewById(R.id.product_name);
            qty = (TextView) itemView.findViewById(R.id.qty_label);
            availability = (TextView) itemView.findViewById(R.id.availability);

            this.onJobListener = onJobListener;

            itemView.setOnClickListener(this);

        }

        @Override
        public void onClick(View v) {
            onJobListener.onItemClick(getAdapterPosition());
        }
    }

    public interface OnJobListener {
        void onItemClick(int position);
    }

}
