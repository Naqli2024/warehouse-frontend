import React, { useState } from "react";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import PurchaseOrderCompanyLogo from "../../../assets/images/quote-request-logo.svg";
import { useEffect } from "react";
import ReceivingQCTable from "./ReceivingQCTable";
import ReceivingQCSidebar from "./ReceivingQCSidebar";

const ReceivingQC = () => {
    const [openPISidebar, setOpenPISidebar] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputType, setInputType] = useState("text");
    const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 1600) {
          setOpenPISidebar(false);
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [isManuallyToggled]);
  
    const toggleSidebar = () => {
      setOpenPISidebar((prev) => !prev);
      setIsManuallyToggled(true);
    };

  return (
     <div className="purchase-indent-container">
      {openPISidebar && (
       <ReceivingQCSidebar/>
      )}
      <div className={openPISidebar ? "col-10" : "col-12"}>
        <div className="pi-right-head">
          <div className="pi-title">
            {openPISidebar ? (
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
            <p>Receiving Quality Check#0000345</p>
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
            <p className="d-flex align-items-center gap-1 ">
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
        <div className="d-md-flex flex-column">
          <div className="pi-top-right-content">
            <div className="col-md-6 rqc-first-column">
             <div className="rqc-deliver-to mt-3 mb-4">
            <div className="purchaser-order-to">
              <p className="mb-3 fw-bold">Order Received From,</p>
              <div className="d-flex gap-3 align-items-center">
                <img src={PurchaseOrderCompanyLogo} alt="purchase-order" />
                <div>
                  <p className="fw-bold">Indruck Systems Ltd</p>
                  <p className="mb-2">Vendor Id: xxxxx</p>
                  <p>xxxxxx</p>
                  <p className="mb-2">xxxxxx</p>
                  <p>91 97947 13297</p>
                </div>
              </div>
            </div>
            <div className="purchaser-order-to">
              <p className="mb-3 fw-bold">Delivered To</p>
                <div>
                  <p className="fw-bold">Grandag Saudi Ltd,</p>
                  <p className="mb-2">Vendor Id: xxxxx</p>
                  <p>xxxxxx</p>
                  <p className="mb-2">xxxxxx</p>
                  <p>91 97947 13297</p>
              </div>
            </div>
          </div>
            </div> 
          </div>
          <ReceivingQCTable/>
        </div>
        <div className="d-flex justify-content-end">
          <div className="d-flex flex-column">
            <div className="rqc-bottom-content">
            <p className="me-2">Total:</p>
            <p>2000 SAR</p>
          </div>
          <div className="rqc-bottom-content">
            <p className="me-2">Transport:</p>
            <p>1000 SAR</p>
          </div>
          <div className="rqc-bottom-content mb-3">
            <p className="me-2">Discount:</p>
            <p>1000 SAR</p>
          </div>
           <div className="rqc-bottom-content fw-bold mb-2">
            <p className="me-2">SHIPMENT VALUE:</p>
            <p>22,000 SAR</p>
          </div>
           <div className="rqc-bottom-content fw-bold">
            <p className="me-2">QC PASS VALUE:</p>
            <p>22,000 SAR</p>
          </div>
          </div>
        </div> 
         <div className="rqc-btns">
            <div className="rqc-debit-btn">
              Quick Debit Note
            </div>
            <div className="rqc-grn-btn">
              Quick GRN
            </div>
            <div className="rqc-approval-btn">
              Send for approval
            </div>
          </div>
      </div>
    </div>
  )
}

export default ReceivingQC