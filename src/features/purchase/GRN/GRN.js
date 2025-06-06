import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import GRNLogo from "../../../assets/images/purchase-indent.svg";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import GRNTable from "./GRNTable";

const GRN = () => {
  const [inputType, setInputType] = useState("text");

  return (
    <div>
      <div className="grn-header">
        <div className="p-3">GRN</div>
        <div className="pi-head-options">
          <div className="grn-option-divider" />
          <p className="d-flex align-items-center gap-1">
            <MdOutlineEdit size={15} />
            Edit
          </p>
          <div className="grn-option-divider" />
          <p className="d-flex align-items-center gap-1 text-secondary">
            <MdOutlineLocalPrintshop size={15} />
            Print
          </p>
          <div className="grn-option-divider" />
          <p className="d-flex align-items-center gap-1 text-secondary">
            <MdDeleteOutline size={15} />
            Delete
          </p>
          <div className="grn-option-divider" />
          <p className="d-flex align-items-center gap-1">
            <FaRegSave size={15} />
            Save
          </p>
        </div>
      </div>
      <div className="grn-top-content">
        <div className="grn-brand">
          <img src={GRNLogo} alt="GRN" />
          <p className="mt-3">Grandag Saudi Ltd,</p>
          <p>Xxxx</p>
          <p className="mb-3">Xxxxxxx</p>
          <p>91 97947 13297</p>
        </div>
        <div className="grn-brand-detail">
          <div className="grn-title">Goods Received Note</div>
          <p>GRN No: xxxx</p>
          <p>Date: 23/05/2025</p>
          <p>PO: xxx</p>
          <p>PO Date: 23/05/2025</p>
        </div>
      </div>
      <div className="grn-text-field">
        <div className="col-md-5 grn-text-column">
          <Form.Group className="mb-4">
            <InputGroup>
              <Form.Control
                className="small-custom-textfield"
                placeholder="Vendor Name"
              />
            </InputGroup>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <div className="col-md-5">
              <div className="grn-textfield-company">
                <p>DF Machine Parts Ltd</p>
                <p>xxxx</p>
                <p>xxxx</p>
                <p>xxxx</p>
                <p className="mt-3">91 97676 68667</p>
              </div>
              <Form.Group className="mt-3">
                <InputGroup>
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="GRN Date"
                    type={inputType}
                    onFocus={() => setInputType("date")}
                    onBlur={(e) => {
                      if (!e.target.value) setInputType("text");
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group className="mb-4">
                <InputGroup>
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="INV NO"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-4">
                <InputGroup>
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Indent No"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-4">
                <InputGroup>
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Transporter"
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
        </div>
        <div className="col-md-3 grn-text-column">
          <Form.Group className="grn-drp mb-4">
            <InputGroup>
              <Form.Select className="small-custom-textfield">
                <option value="">Multiple PO</option>
                <option>Person 1</option>
                <option>Person 2</option>
                <option>Person 3</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
          <Form.Group className="grn-drp mb-4">
            <InputGroup>
              <Form.Control
                className="small-custom-textfield"
                placeholder="Partial Shipment"
              />
            </InputGroup>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Form.Group className="mb-4">
            <InputGroup>
              <Form.Control
                className="small-custom-textfield"
                placeholder="Advance"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-4">
            <InputGroup>
              <Form.Control
                className="small-custom-textfield"
                placeholder="Balance"
              />
            </InputGroup>
          </Form.Group>
          </div>
          <Form.Group className="mb-4">
            <InputGroup>
              <Form.Control
                className="small-custom-textfield"
                placeholder="Vehicle No"
              />
            </InputGroup>
          </Form.Group>
        </div>
        <div className="col-md-3 grn-text-column">
          <Form.Group className="mb-4">
            <InputGroup>
              <Form.Control
                className="small-custom-textfield"
                placeholder="PO No"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-4">
            <InputGroup>
              <Form.Control
                className="small-custom-textfield"
                placeholder="BIL"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="grn-drp mb-4">
            <InputGroup>
              <Form.Control
                className="small-custom-textfield"
                placeholder="Contract"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-4">
            <InputGroup>
              <Form.Control
                className="small-custom-textfield"
                placeholder="Transporter Doc"
              />
            </InputGroup>
          </Form.Group>
        </div>
      </div>
      <GRNTable/>
    </div>
  );
};

export default GRN;
