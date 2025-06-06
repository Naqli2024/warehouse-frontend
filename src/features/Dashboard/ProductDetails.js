import React, { useEffect, useRef } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";
import IconButton from "@mui/material/IconButton";
import Purchase from "../../assets/images/purchase.svg";
import PutAway from "../../assets/images/putaway.svg";
import OrderPacking from "../../assets/images/order-packing.svg";
import Shipping from "../../assets/images/shipping.svg";
import Returns from "../../assets/images/returns.svg";
const ProductDetails = () => {
  const options = [
    'All Time',
    'Monthly',
    'This Week',
    'This year',
  ];
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
    <div className="col-md-5 product-outer-container">
      <div className="product-filter-container">
        <div className="selected-filter-data">{selectedTimeOption}</div>
        <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div className="product-filter-icon"><RiEqualizerLine size={20}/></div>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '15ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} 
          selected={option === selectedTimeOption}
          onClick={() => {
            setSelectedTimeOption(option);
            handleClose();
          }}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      </div>
        <div className="product-box">
          <div className="product-box-image">
            <img src={Purchase} alt="Purchase" />
          </div>
          <div>
            <p className="product-box-number">5645</p>
            <p className="product-box-description">Purchase</p>
          </div>
        </div>
        <div className="product-box">
          <div className="product-box-image">
            <img src={PutAway} alt="PutAway" />
          </div>
          <div>
            <p className="product-box-number">5645</p>
            <p className="product-box-description">Putaway</p>
          </div>
        </div>
        <div className="product-box">
          <div className="product-box-image">
            <img src={OrderPacking} alt="OrderPacking" />
          </div>
          <div>
            <p className="product-box-number">20000</p>
            <p className="product-box-description">Order Packing</p>
          </div>
        </div>
        <div className="product-box">
          <p className="product-box-image">
            <img src={Shipping} alt="Shipping" />
          </p>
          <div>
            <p className="product-box-number">600</p>
            <p className="product-box-description">Shipping</p>
          </div>
        </div>
        <div className="product-box">
          <p className="product-box-image">
            <img src={Returns} alt="Returns" />
          </p>
          <div>
            <p className="product-box-number">600</p>
            <p className="product-box-description">Returns</p>
          </div>
        </div>
    </div>
  );
};

export default ProductDetails;
