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

public class ProductRecyclerAdapter extends RecyclerView.Adapter<ProductRecyclerAdapter.ViewHolder> {

    private final Context context;
    private final String[] job_titles;
    private final String[] company_names;
    private final String[] posted_dates;
    private final OnJobListener jobListener;

    public ProductRecyclerAdapter(Context context, String[] job_titles, String[] company_names, String[] posted_dates, OnJobListener jobListener) {
        this.context = context;
        this.job_titles = job_titles;
        this.company_names = company_names;
        this.posted_dates = posted_dates;
        this.jobListener = jobListener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        //instantiate the view
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.product_item, parent, false);
        return new ViewHolder(view, jobListener);
    }

    @SuppressLint("RecyclerView")
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        holder.jobTitle.setText(job_titles[position]);
        holder.company.setText(company_names[position]);
        holder.postedDate.setText(posted_dates[position]);
     /*   holder.favButton.setImageResource(R.drawable.fav_icon);*/
        /*holder.favButton.setColorFilter(ContextCompat.getColor(context, R.color.chinese_silver), android.graphics.PorterDuff.Mode.SRC_IN);*/
    }

    @Override
    public int getItemCount() {
        return job_titles.length;
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        MaterialCardView materialCardView;
        TextView jobTitle;
        TextView company;
        TextView postedDate;
        ImageButton favButton;
        OnJobListener onJobListener;

        public ViewHolder(@NonNull View itemView, OnJobListener onJobListener) {
            super(itemView);

            materialCardView = (MaterialCardView) itemView.findViewById(R.id.product_card_layout);
            jobTitle = (TextView) itemView.findViewById(R.id.product_title);
            company = (TextView) itemView.findViewById(R.id.prodcut_name);
         /*   favButton = (ImageButton) itemView.findViewById(R.id.);*/
            postedDate = (TextView) itemView.findViewById(R.id.job_posted_date);
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
