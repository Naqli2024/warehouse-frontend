import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const quoteData = [
  { name: "Jan", value: 60 },
  { name: "Feb", value: 70 },
  { name: "Mar", value: 75 },
  { name: "Apr", value: 74 },
  { name: "May", value: 76 },
  { name: "Jun", value: 75 },
];

const deliveryData = [
  { name: "Jan", value: 85 },
  { name: "Feb", value: 80 },
  { name: "Mar", value: 78 },
  { name: "Apr", value: 30 },
  { name: "May", value: 40 },
  { name: "Jun", value: 92 },
];

const VendorDashboard = () => {
  return (
    <div className="mt-5 vendor-dashboard-dashboard-wrapper">
      <h1 className="vendor-dashboard-heading">Welcome, Indruck Systems Ltd</h1>
      <div className="col-md-8">
        <div className="vendor-dashboard-top-card">
          <div className="g-3">
            <div className="vendor-dashboard-stat-card justify-content-center align-items-start">
              <h6>Incoming Quotes</h6>
              <h3>125</h3>
            </div>
          </div>
          <div className="g-3">
            <div className="vendor-dashboard-stat-card justify-content-center align-items-start">
              <h6>Approved Quotes</h6>
              <h3>85</h3>
            </div>
          </div>
          <div className="g-3">
            <div className="vendor-dashboard-stat-card justify-content-center align-items-start">
              <h6>Rejected Quotes</h6>
              <h3>40</h3>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mb-3 fw-bold">Quick Actions</h5>
      <div className="mb-5 vendor-dashboard-action-buttons">
        <button className="btn btn-primary">Item Master</button>
        <button className="btn vendor-dashboard-btn-color-change">
          Advance Shipping Notice
        </button>
      </div>
      <h5 className="mb-4 fw-bold">Vendor Performance</h5>
      <div className="col-md-8">
        <div className="vendor-dashboard-graph">
          <div className="vendor-dashboard-custom-card mb-4">
            <h6>Quote Approval Rate</h6>
            <h3>75%</h3>
            <p className="text-muted mb-2">
              Last 30 Days <span className="text-success">+5%</span>
            </p>
            <div style={{ width: "80%", height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={quoteData}
                  margin={{ top: 20, right: 0, bottom: 20, left: 50 }}
                >
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="#dce0e5" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="vendor-dashboard-custom-card mb-4">
            <h6>On-Time Delivery</h6>
            <h3>92%</h3>
            <p className="text-muted mb-2">
              Last 30 Days <span className="text-danger">-2%</span>
            </p>
            <div style={{ width: "100%", height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={deliveryData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4e5d78"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
