import React from "react";
import Home from "../../../assets/images/home.svg";
import HomeCard from "./HomeCard";
import Header from "../Header/Header";

const HomePage = () => {
  return (
    <>
    <Header/>
      <div class="top-content">
        <div class="row main-content">
          <div class="col-12 col-md-8 home-top">
            <div class="text-size fw-bold fs-1">
              <h2 class="text-size ms-0 fw-bold">
                Streamline your inventory with our
              </h2>
              <h2 class="text-size text-primary me-md-2 ms-0 fw-bold">
                Warehouse Management
                <span class="text-dark" style={{ fontSize: "inherit", margin: "0px 10px" }}>
                  System
                </span>
              </h2>
            </div>
            <div class="text-size col-md-6 me-sm-3">
              Streamline warehouse operations with real time tracking, automated
              fulfillment, and seamless integration. Optimize workflows, reduce
              errors, and boost productivity. Scalable and easy to use our
              solution grows with your business.
            </div>
            <div class="row mt-4 gx-2 button-group">
              <div class="col-auto">
                <button class="btn btn-outline-secondary text-white fw-bold bg-primary me-3">
                  Get started for free
                </button>
              </div>
              <div class="col-auto">
                <button class="btn btn-outline-primary text-dark fw-bold btn-no-hover">
                  Request a demo
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 row-sm-6 col-md-4 text-end mt-4 mt-md-0">
            <img
              src={Home}
              alt="salesAnalysis Image"
              class="img-fluid"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
      <HomeCard />
    </>
  );
};

export default HomePage;