import React, { useState } from "react";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import PurchaseIndentLogo from "../../../assets/images/purchase-indent.svg";
import PurchaseOrderCompanyLogo from "../../../assets/images/quote-request-logo.svg";
import { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import DebitNoteSidebar from "./DebitNoteSidebar";
import DebitNoteTable from "./DebitNoteTable";

const DebitNote = () => {
      const [openDNSidebar, setOpenDNSidebar] = useState(true);
      const [inputType, setInputType] = useState("text");
      const [isManuallyToggled, setIsManuallyToggled] = useState(false);
      const [createPO, setCreatePO] = useState(false);
      const [dropdowns, setDropdowns] = useState(["", "", ""]);
    
      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 1600) {
            setOpenDNSidebar(false);
          }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, [isManuallyToggled]);
    
      const toggleSidebar = () => {
        setOpenDNSidebar((prev) => !prev);
        setIsManuallyToggled(true);
      };
    
      const handleChange = (index, value) => {
        const updated = [...dropdowns];
        updated[index] = value;
        setDropdowns(updated);
      };
    
      const addDropdown = () => {
        setDropdowns([...dropdowns, ""]);
      };
    
  return (
     <div>
      <div className="dn-container">
        {openDNSidebar && <DebitNoteSidebar />}
        <div className={openDNSidebar ? "col-10" : "col-12"}>
          <div className="dn-right-head">
            <div className="pi-title">
              {openDNSidebar ? (
                <IoMdArrowDropleftCircle
                  size={25}
                  className="cursor-pointer"
                  onClick={toggleSidebar}
                />
              ) : (
                <IoMdArrowDroprightCircle
                  size={25}
                  className="cursor-pointer"
                  onClick={toggleSidebar}
                />
              )}
              <p>Debit Note #0000345</p>
            </div>
            <div className="pi-head-options">
              <div className="pi-option-divider" />
              <p className="d-flex align-items-center gap-1 text-secondary">
                <MdOutlineEdit size={15} />
                Edit
              </p>
              <div className="pi-option-divider" />
              <p className="d-flex align-items-center gap-1 text-secondary">
                <MdOutlineLocalPrintshop size={15} />
                Print
              </p>
              <div className="pi-option-divider" />
              <p className="d-flex align-items-center gap-1 text-secondary">
                <MdDeleteOutline size={15} />
                Delete
              </p>
              <div className="pi-option-divider" />
              <p className= "d-flex align-items-center gap-1" >
                <FaRegSave size={15} />
                Save
              </p>
              <div className="pi-option-divider" />
              <p className= "d-flex align-items-center gap-1" >
                <FaRegSave size={15} />
                Save & Send
              </p>
            </div>
          </div>
          <div className="d-md-flex flex-column">
            <div className="dn-top-right-content">
              <div className="col-md-3 po-save-top-data">
                <img
                  src={PurchaseIndentLogo}
                  alt="purchase-order"
                  className={createPO && "mt-5"}
                />
                <p className="mt-3">Grandag Saudi Ltd,</p>
                <p>Xxxx</p>
                <p className="mb-3">Xxxxxxx</p>
                <p>91 97947 13297</p>
              </div>
              <div className="col-md-3 po-save-top-data">
                <div className="d-flex gap-2">
                        <p>PO Date:</p>
                        <p>22/05/2025</p>
                      </div>
                      <div className="d-flex gap-2">
                        <p>PO No:</p>
                        <p>#0000345</p>
                      </div>
                      <div className="d-flex gap-2">
                        <p>Supply:</p>
                        <p>Domestic</p>
                      </div>
                      <div className="d-flex gap-2">
                        <p>Invoice No:</p>
                        <p>INV 000xxx</p>
                      </div>
                      <div className="d-flex gap-2">
                        <p>Invoice Date:</p>
                        <p>12/04/2025</p>
                      </div>
              </div>
              <div className="col-md-3 po-save-top-data">
                <div className="d-flex gap-2">
                        <p>Payment Terms:</p>
                        <p>90 Days</p>
                      </div>
                      <div className="d-flex gap-2">
                        <p>Mode:</p>
                        <p>Monthly Contract</p>
                      </div>
                      <div className="d-flex gap-2">
                        <p>Delivery Date:</p>
                        <p>22/05/2025</p>
                      </div>
                      <div className="d-flex gap-2">
                        <p>Advance Payment:</p>
                        <p>50%</p>
                      </div>
              </div>
                <div className="col-md-3 po-save-top-data">
                <div className="purchaser-order-to">
              <p className="mb-3 fw-bold">Issued To</p>
              <div className="d-flex gap-3">
                <img src={PurchaseOrderCompanyLogo} alt="purchase-order" />
                <div>
                  <p className="fw-bold">Indruck Systems Ltd</p>
                  <p>Vendor Id: xxxxx</p>
                  <p>xxxxxx</p>
                  <p>91 97947 13297</p>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
          <DebitNoteTable />
        </div>
      </div>
      <div className="dn-btns">
            <div className="rqc-grn-btn">
              Immediate Return
            </div>
            <div className="rqc-approval-btn">
              Put
            </div>
          </div>
    </div>
  )
}

export default DebitNote