import React from "react";
import TotalWarehouse from "../../assets/images/total-warehouse.svg";
import DocksFull from "../../assets/images/warehouse-logo.svg";
import DocksEmpty from "../../assets/images/dock-empty.svg";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";

const AddDetails = () => {
  const timeOptions = ["All Time", "Monthly", "This Week", "This Year"];
  const dockFullOptions = ["All", "Bin", "Space", "Dock"];
  const ITEM_HEIGHT = 48;
  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const [dockFullAnchorEl1, setDockFullAnchorEl1] = React.useState(null);
  const [dockFullAnchorEl2, setDockFullAnchorEl2] = React.useState(null);
  const [selectedTimeOption, setSelectedTimeOption] =
    React.useState("All Time");
  const openFilter = Boolean(filterAnchorEl);
  const openDock1 = Boolean(dockFullAnchorEl1);
  const openDock2 = Boolean(dockFullAnchorEl2);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleDock1Click = (event) => {
    setDockFullAnchorEl1(event.currentTarget);
  };
  const handleDock2Click = (event) => {
    setDockFullAnchorEl2(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  const handleDock1Close = () => {
    setDockFullAnchorEl1(null);
  };
  const handleDock2Close = () => {
    setDockFullAnchorEl2(null);
  };

  return (
    <div className="warehouse-outer-container">
      <div className="filter-container">
        <IconButton onClick={handleFilterClick}>
          <div className="filter-icon">
            <RiEqualizerLine size={20} />
          </div>
        </IconButton>
        <Menu
          anchorEl={filterAnchorEl}
          open={openFilter}
          onClose={handleFilterClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "15ch",
            },
          }}
        >
          {timeOptions.map((option) => (
            <MenuItem
              key={option}
              selected={option === selectedTimeOption}
              onClick={() => {
                setSelectedTimeOption(option);
                handleFilterClose();
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <div className="ms-2">{selectedTimeOption}</div>
      </div>
      <div className="warehouse-box">
        <div className="warehouse-box-image">
          <img src={TotalWarehouse} alt="TotalWarehouse" />
        </div>
        <div>
          <p className="warehouse-box-number">5</p>
          <p className="warehouse-box-description">Warehouses</p>
        </div>
      </div>
      <div className="warehouse-box">
        <div className="dock-full-filter-container">
          <IconButton onClick={handleDock1Click}>
            <div className="filter-icon">
              <RiEqualizerLine size={15} />
            </div>
          </IconButton>
          <Menu
            anchorEl={dockFullAnchorEl1}
            open={openDock1}
            onClose={handleDock1Close}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "15ch",
              },
            }}
          >
            {dockFullOptions.map((option) => (
              <MenuItem key={option} onClick={handleDock1Close}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="docks-box-image">
          <img src={DocksFull} alt="DocksFull" />
        </div>
        <div>
          <p className="warehouse-box-number">4454</p>
          <p className="warehouse-box-description">Total Docks Full</p>
        </div>
      </div>
      <div className="warehouse-box">
        <div className="dock-full-filter-container">
          <IconButton onClick={handleDock2Click}>
            <div className="filter-icon">
              <RiEqualizerLine size={15} />
            </div>
          </IconButton>
          <Menu
            anchorEl={dockFullAnchorEl2}
            open={openDock2}
            onClose={handleDock2Close}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "15ch",
              },
            }}
          >
            {dockFullOptions.map((option) => (
              <MenuItem key={option} onClick={handleDock2Close}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="docks-empty-box-image">
          <img src={DocksEmpty} alt="DocksEmpty" />
        </div>
        <div>
          <p className="warehouse-box-number">5675</p>
          <p className="warehouse-box-description">Dock Empty</p>
        </div>
      </div>
    </div>
  );
};

export default AddDetails;
