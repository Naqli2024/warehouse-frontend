import React, { useRef, useEffect } from "react";
import { salesActivity } from "../../data/DashboardData";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const SalesActivity = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const chartCtx = chartRef.current.getContext("2d");

    const labels = salesActivity.map((item) => item.category);
    const data = salesActivity.map((item) => parseFloat(item.data));

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartCtx, {
      type: "doughnut",
      data: {
        // labels,
        datasets: [
          {
            data,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                // Safely map index to get the data value and category dynamically
                const index = tooltipItem.dataIndex;
                const category = salesActivity[index]?.category || "Unknown";
                const value = salesActivity[index]?.data || 0;

                return `${category}: ${value}`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="col-md-4 product-details sales-analysis">
      <h4>Sales Activity</h4>
      <div className="product-details-sub">
        <canvas
          ref={chartRef}
          style={{ maxWidth: "200px", margin: "0 auto" }}
        />
        <div className="product-details-container">
          {salesActivity.map((sales, index) => (
            <div className="product-details-item" key={index}>
              <p className="category">{sales.category}</p>
              <p className="count">{sales.data}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesActivity;
