import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";

const SalesAnalysis = () => {
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
  return (
    <div className="sales-analysis-outer-container">
      <div className="sales-analysis-head">
        <div className="sales-analysis-text">Sales Analysis - Categories</div>
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
            <div className="sales-filter-icon">
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
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            area: true,
            curve: "natural",
            // color: "#a285d3",
            color:"#7d7f91",
          },
        ]}
        height={300}
        sx={{
          "& .MuiChartsAxis-tickLabel": {
            fill: "white",
          },
          "& .MuiChartsAxis-line": {
            stroke: "white",
          },
          "& .MuiChartsAxis-tick": {
            stroke: "white",
          },
        }}
      />
    </div>
  );
};

export default SalesAnalysis;
