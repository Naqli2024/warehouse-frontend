import React, { useState } from "react";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { IoMdArrowDropdown } from "react-icons/io";

const NegotiateQuoteRequest = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("Template");
  return (
    <div className="ms-4">
      <div className="qr-negotiate">
        <p>Dear Rakesh</p>
        <p className="ms-4">Wishes From, Write Your Comment</p>
        <hr className="mt-2 mb-2" />
        <Form.Group className="d-flex align-items-center mt-2 col-md-12">
          <div className="col-md-5 col-sm-5">
          <FormLabel className="negotiate-label">State Previous Quote</FormLabel>
          </div>
          <div  className="col-md-4 col-sm-4">
          <InputGroup className="col-md-1">
            <Form.Control className="negotiate-custom-textfield"/>
          </InputGroup>
          </div>
        </Form.Group>
        <Form.Group className="d-flex align-items-center mt-2">
        <div className="col-md-5 col-sm-5">
          <FormLabel className="negotiate-label">Other Vendor Quote</FormLabel>
          </div>
          <div  className="col-md-4 col-sm-4">
          <InputGroup className="col-md-1">
            <Form.Control className="negotiate-custom-textfield"/>
          </InputGroup>
          </div>
        </Form.Group>
        <Form.Group className="d-flex align-items-center mt-2">
        <div className="col-md-5 col-sm-5">
          <FormLabel className="negotiate-label">Market Price</FormLabel>
          </div>
          <div  className="col-md-4 col-sm-4">
          <InputGroup className="col-md-1">
            <Form.Control className="negotiate-custom-textfield"/>
          </InputGroup>
          </div>
        </Form.Group>
        <Form.Group className="d-flex align-items-center mt-2">
        <div className="col-md-5 col-sm-5">
          <FormLabel className="negotiate-label">Transport</FormLabel>
          </div>
          <div  className="col-md-4 col-sm-4">
          <InputGroup className="col-md-1">
            <Form.Control className="negotiate-custom-textfield"/>
          </InputGroup>
          </div>
        </Form.Group>
        <hr className="mt-2 mb-2" />
        <Form.Group className="d-flex align-items-center mt-2">
        <div className="col-md-5 col-sm-5">
          <FormLabel className="negotiate-label">Payment Terms</FormLabel>
          </div>
          <div className="col-md-4 col-sm-4">
          <InputGroup>
            <Form.Select className="negotiate-custom-textfield">
              <option value=""></option>
              <option>Person 1</option>
              <option>Person 2</option>
              <option>Person 3</option>
            </Form.Select>
          </InputGroup>
          </div>
        </Form.Group>
        <hr className="mt-2 mb-2" />
        <p className="mb-2">
          We kindly request you to relook into the quote provided, considering
          our intention to build a long-term business relationship with your
          esteemed company. Please be assured that the awarding of this
          consignment is confirmed from our end, and we are keen to move forward
          together.
        </p>
        <p className="mb-4">
          We look forward to your revised proposal / submission on vendor portal
          and a mutually beneficial partnership.
        </p>
        <div className="d-flex justify-content-between">
          <div>
            <p>Warm regards,</p>
            <p>Amir</p>
            <p>CFO</p>
            <p>Grandag Saudi Ltd,</p>
          </div>
          <div className="d-flex gap-3">
            <div className="d-flex align-items-center">
              <input type="checkbox" />
              <p className="ms-1" style={{color:"#486895"}}>Send via Mail</p>
            </div>
            <div className="d-flex align-items-center">
              <input type="checkbox" />
              <p className="ms-1" style={{color:"#486895"}}>Send via Portal</p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end gap-2 pt-3 pb-3 me-3">
        <div className="template-btn">+ Create Template</div>
        <div className="template-btn">Save Template</div>
        <div className="select-template-btn">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" {...bindTrigger(popupState)}>
                  {selectedTemplate} <IoMdArrowDropdown />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      setSelectedTemplate("Template 1");
                      popupState.close();
                    }}
                  >
                    Template 1
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSelectedTemplate("Template 2");
                      popupState.close();
                    }}
                  >
                    Template 2
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSelectedTemplate("Template 3");
                      popupState.close();
                    }}
                  >
                    Template 3
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </div>
      </div>
      <hr className="m-2"/>
    </div>
  );
};

export default NegotiateQuoteRequest;
