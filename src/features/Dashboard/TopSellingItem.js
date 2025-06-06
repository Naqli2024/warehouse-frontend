import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";

const TopSellingItem = () => {
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
  return (
    <div className="top-selling-outer-container">
      <div className="sales-analysis-head">
        <div className="top-selling-text">Top Selling Item</div>
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
      <div className="d-flex justify-content-between">
         <div className="selling-box">
        <div>
          <p className="selling-box-name">Cheese</p>
          <p className="selling-box-description">1000 Pcs</p>
          <p className="selling-box-amount">5000 SAR</p>
        </div>
      </div>
       <div className="selling-box">
        <div>
          <p className="selling-box-name">Milk</p>
          <p className="selling-box-description">2 Ltr</p>
          <p className="selling-box-amount">1000 SAR</p>
        </div>
      </div>
      <div className="selling-box">
        <div>
          <p className="selling-box-name">Biscuits</p>
          <p className="selling-box-description">5000 Pcs</p>
          <p className="selling-box-amount">2000 SAR</p>
        </div>
      </div>
      </div>
      <div className="d-flex justify-content-between">
         <div className="selling-box">
        <div>
          <p className="selling-box-name">Cheese</p>
          <p className="selling-box-description">1000 Pcs</p>
          <p className="selling-box-amount">5000 SAR</p>
        </div>
      </div>
       <div className="selling-box">
        <div>
          <p className="selling-box-name">Milk</p>
          <p className="selling-box-description">2 Ltr</p>
          <p className="selling-box-amount">1000 SAR</p>
        </div>
      </div>
      <div className="selling-box">
        <div>
          <p className="selling-box-name">Biscuits</p>
          <p className="selling-box-description">5000 Pcs</p>
          <p className="selling-box-amount">2000 SAR</p>
        </div>
      </div>
      </div>
      <div className="d-flex justify-content-between">
         <div className="selling-box">
        <div>
          <p className="selling-box-name">Cheese</p>
          <p className="selling-box-description">1000 Pcs</p>
          <p className="selling-box-amount">5000 SAR</p>
        </div>
      </div>
       <div className="selling-box">
        <div>
          <p className="selling-box-name">Milk</p>
          <p className="selling-box-description">2 Ltr</p>
          <p className="selling-box-amount">1000 SAR</p>
        </div>
      </div>
      <div className="selling-box">
        <div>
          <p className="selling-box-name">Biscuits</p>
          <p className="selling-box-description">5000 Pcs</p>
          <p className="selling-box-amount">2000 SAR</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TopSellingItem;
