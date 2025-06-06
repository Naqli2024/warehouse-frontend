import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";

const StockAvailability = () => {
  const options = ["All Time", "Monthly", "This Week", "This year"];
  const ITEM_HEIGHT = 48;
const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedTimeOption, setSelectedTimeOption] =React.useState("All Time");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const pieData = [
    { id: 0, value: 40, label: "In Stock" },
    { id: 1, value: 35, label: "Out of Stock" },
    { id: 2, value: 25, label: "Available Stock" },
  ];
  const valueFormatter = (item) => `${item.value}%`;
  return (
    <div className="stock-availability-outer-container">
      <div className="sales-analysis-head">
        <div className="sales-analysis-text">Stock Availability</div>
        <div className="selected-filter-data">{selectedTimeOption}</div>
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <div className="stock-filter-icon">
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
      <div className="stock-chart">
         <PieChart
        series={[
          {
            data: pieData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
          },
        ]}
        height={300}
        width={300}
        slotProps={{
          legend: { hidden: true },
        }}
      />
      </div>
    </div>
  );
};

export default StockAvailability;
