import React from "react";

const HomeCard = () => {
  return (
    <div class="d-flex justify-content-center align-items-center mt-5">
      <div class="card outer-card bg-white shadow">
        <div class="card-body">
          <div class="d-flex justify-content-evenly flex-wrap mt-3 mb-4">
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 card">
              <div class="card-body d-flex flex-column justify-content-end text-center">
                Warehouse
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 card">
              <div class="card-body d-flex flex-column justify-content-end text-center">
                Manufacturing
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 card">
              <div class="card-body d-flex flex-column justify-content-end text-center">
                Point of sale
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 card">
              <div class="card-body d-flex flex-column justify-content-end text-center">
                Transport management
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 card">
              <div class="card-body d-flex flex-column justify-content-end text-center">
                Booking management
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;