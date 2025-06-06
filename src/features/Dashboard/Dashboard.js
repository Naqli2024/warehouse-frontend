import React from "react";
import AddDetails from "./AddDetails";
import ProductDetails from "./ProductDetails";
import SalesAnalysis from "./SalesAnalysis";
import StockAvailability from "./StockAvailability";
import ProductSale from "./ProductSale";
import SalesActivity from "./SalesActivity";
import TopSellingItem from "./TopSellingItem";

const Dashboard = () => {
  return (
    <div className="dashboard-padding" style={{ backgroundColor: "white"}}>
      <div className="dashboard-row">
        <div className="col-md-7 warehouse-sales-overview">
          <AddDetails />
           <SalesAnalysis />
        </div>
        <ProductDetails />
      </div>
      <div className="dashboard-row">
        <div className="col-md-6 warehouse-sales-overview">
          <StockAvailability />
        </div>
        <div className="col-md-6 warehouse-sales-overview">
          <TopSellingItem />
        </div>
      </div>
      <div className="dashboard-row mt-3">
        <ProductSale />
      </div>
    </div>
  );
};

export default Dashboard;
