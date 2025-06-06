import React, { useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { productSaleData } from "../../data/DashboardData";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ProductSale = () => {
  const options = ["All Time", "Monthly", "This Week", "This year"];
  const ITEM_HEIGHT = 48;
  const [selectedTimeOption, setSelectedTimeOption] =React.useState("All Time");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = productSaleData.map((item) => item.month);
    const grossMargins = productSaleData.map((item) => item.data.GrossMargin);
    const revenues = productSaleData.map((item) => item.data.Revenue);
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Gross Margin",
            data: grossMargins,
            backgroundColor: "#2196F3",
            barThickness: 20,
            borderRadius: 5,
          },
          {
            label: "Revenue",
            data: revenues,
            backgroundColor: "#EB6424",
            barThickness: 20,
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Product Sale Analysis (Gross Margin vs Revenue)",
          },
        },
        scales: {
          x: {
            title: {
              display: false,
            },
            categoryPercentage: 0.7,
            barPercentage: 0.6,
          },
          y: {
            title: {
              display: false,
            },
          },
        },
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
        <div className="col-md-12 product-sale-container">
        <div className="sales-analysis-head">
        <div className="top-selling-text">Error Monitoring System</div>
        <div className="error-selected-filter">{selectedTimeOption}</div>
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <div className="selling-filter-icon">
              <RiEqualizerLine size={20} />
            </div>
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "15ch",
                },
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === selectedTimeOption}
                onClick={() => {
                  setSelectedTimeOption(option);
                  handleClose();
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
        <div className="product-sale-box">
          <div className="error-container">
            <p className="error-indicator" />
            <p>Picking Errors</p>
            <p className="error-count">3</p>
          </div>
          <div className="error-container">
            <p className="red-error-indicator" />
            <p>Packing Errors</p>
            <p className="error-count">3</p>
          </div>
          <div className="error-container">
            <p className="error-indicator" />
            <p>Manufacturing defects</p>
            <p className="error-count">3</p>
          </div>
          <div className="error-container">
            <p className="error-indicator" />
            <p>Labelling issues</p>
            <p className="error-count">3</p>
          </div>
          <div className="error-container">
            <p className="error-indicator" />
            <p>Sorting issues</p>
            <p className="error-count">3</p>
          </div>
        </div>
        <canvas className="canvas-height" ref={chartRef} style={{ maxHeight: "350px" }}></canvas>
      </div>
  );
};

export default ProductSale;
