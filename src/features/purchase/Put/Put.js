import React, { useState } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { MdOutlineEdit, MdOutlineLocalPrintshop, MdDeleteOutline, MdMoreVert, MdDone } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { InputGroup, Form, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const normalOptions = [
  "Field Customization",
  "Preferences",
  "Template",
  "Refresh",
  "Reset Column width",
  "Import from GRN"
];

const bulkOptions = [
  "Bulk Put",
  "Delete",
  "Print / Pdf",
  "Hold / Pause Action",
  "Bulk Update"
];

const ITEM_HEIGHT = 48;

const Put = () => {
  const [inputType, setInputType] = useState("text");
  const [activeTab, setActiveTab] = useState("completed");

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const menuOptions = selectedItems.length > 0 ? bulkOptions : normalOptions;

  const renderPutItem = (index) => (
    <div className="put-items" key={index}>
      <input
        type="checkbox"
        checked={selectedItems.includes(index)}
        onChange={() => handleCheckboxChange(index)}
      />
      <div className="vr" />
      <p>Item XXXXX</p>
      <div className="vr" />
      <p>Item Classification</p>
      <div className="vr" />
      <Form.Group>
        <InputGroup>
          <Form.Control className="small-custom-textfield" placeholder="GRN No" />
        </InputGroup>
      </Form.Group>
      <div className="vr" />
      <Form.Group>
        <InputGroup>
          <Form.Control className="small-custom-textfield" placeholder="PO No" />
        </InputGroup>
      </Form.Group>
      <div className="vr" />
      <Form.Group>
        <InputGroup>
          <Form.Control className="small-custom-textfield" placeholder="Rack" />
        </InputGroup>
      </Form.Group>
      <div className="vr" />
      <Form.Group>
        <InputGroup>
          <Form.Select className="small-custom-textfield">
            <option value="rack1"></option>
            <option value="rack2">Rack 2</option>
            <option value="rack3">Rack 3</option>
            <option value="rack4">Rack 4</option>
          </Form.Select>
        </InputGroup>
      </Form.Group>
      <div className="vr" />
      <div className="put-approve-btn">
        <MdDone />
        Approve
      </div>
    </div>
  );

  return (
    <div>
      <div className="pi-right-head">
        <div className="pi-title">
          <p>Put</p>
        </div>
        <div className="pi-head-options">
          <div className="pi-option-divider" />
          <p className="d-flex align-items-center gap-1">
            <MdOutlineEdit size={15} />
            Edit
          </p>
          <div className="pi-option-divider" />
          <p className="d-flex align-items-center gap-1">
            <MdOutlineLocalPrintshop size={15} />
            Print
          </p>
          <div className="pi-option-divider" />
          <p className="d-flex align-items-center gap-1">
            <MdDeleteOutline size={15} />
            Delete
          </p>
          <div className="pi-option-divider" />
          <p className="d-flex align-items-center gap-1 text-secondary">
            <FaRegSave size={15} />
            Save
          </p>
        </div>
      </div>

      <div className="put-top-options">
        <div className="put-top-field">
          <Form.Group className="put-filter col-md-3">
            <InputGroup>
              <Form.Select className="put-custom-textfield">
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <Form.Control
                className="put-custom-textfield"
                placeholder="From"
                type={inputType}
                onFocus={() => setInputType("date")}
                onBlur={() => setInputType("text")}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <Form.Control
                className="put-custom-textfield"
                placeholder="To"
                type={inputType}
                onFocus={() => setInputType("date")}
                onBlur={() => setInputType("text")}
              />
            </InputGroup>
          </Form.Group>
        </div>

        <div className="d-flex gap-2">
          <div
            className={activeTab === "pending" ? "put-tabs" : "put-tab-inactive"}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </div>
          <div className="vr" />
          <div
            className={activeTab === "completed" ? "put-tabs" : "put-tab-inactive"}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </div>
        </div>
        <div/>
        <div/>
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <div className="more-pi-btn">
              <MoreVertIcon size={14} />
            </div>
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button"
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch"
                }
              }
            }}
          >
            {menuOptions.map((option) => (
              <MenuItem key={option} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      {renderPutItem(0)}
      {renderPutItem(1)}
    </div>
  );
};

export default Put;
