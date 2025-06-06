import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import VendorReRFQSidebar from "./VendorReRFQSidebar";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import { getUserById } from "../../../../redux/auth/userSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { sendReQuote } from "../../../../redux/Vendor/VendorSlice";
import Cookies from "js-cookie";

const VendorReRFQ = () => {
  const [openPISidebar, setOpenPISidebar] = useState(true);
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [requestedUser, setRequestedUser] = useState(null);
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (selectedRFQ?.requestedBy) {
      dispatch(getUserById(selectedRFQ.requestedBy))
        .unwrap()
        .then((userData) => setRequestedUser(userData))
        .catch((err) => {
          console.error("Failed to fetch user", err);
        });
    }
  }, [dispatch, selectedRFQ]);

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

  const onSubmitReQuote = (data) => {
    try {
      const vendorId = Cookies.get("_id");
      const selectedItem = selectedRFQ?.item || selectedRFQ?.matchedItems?.[0];
      if (!selectedRFQ || !selectedItem || !selectedRFQ.purchaseIndentId) {
        toast.error("Missing RFQ details.");
        return;
      }
      
      const payload = {
        vendorId,
        purchaseIndentId: selectedRFQ?.purchaseIndentId,
        itemReQuotes: [
          {
            _id: selectedItem._id,
            reQuoteBreakdown: [
              {
                quoteNo: selectedRFQ?.quoteNo || 0,
                discount: parseFloat(data.discount || 0),
                tax: parseFloat(data.tax || 0),
                transport: parseFloat(data.transport || 0),
                loading: parseFloat(data.loading || 0),
                others: parseFloat(data.others || 0),
              },
            ],
            reQuotePrice: parseFloat(data.reQuotePrice || 0),
            reQuoteComments: data.comments || "",
          },
        ],
      };
      dispatch(sendReQuote(payload))
        .unwrap()
        .then((response) => {
          toast.success(response.message, {autoClose: 2000});
              setSelectedRFQ((prev) => ({
        ...prev,
        item: {
          ...prev.item,
          reQuotePrice: payload.itemReQuotes[0].reQuotePrice,
          reQuoteComments: payload.itemReQuotes[0].reQuoteComments,
        },
      }));
          reset();
        })
        .catch((err) => toast.error(err.message, {autoClose: 2000} ));
    } catch (err) {
      console.error("Error submitting re-quote", err);
      toast.error("Unexpected error occurred.");
    }
  };
  
  return (
    <div className="purchase-order-container">
      {openPISidebar && <VendorReRFQSidebar onSelectRFQ={setSelectedRFQ} />}
      <div className="d-flex">
        <div className="vendor-rfq-divider" />
      </div>
      <div className={openPISidebar ? "col-10" : "col-12"}>
        {selectedRFQ ? (
        <>
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
              <p>Re-Request For Quote #{selectedRFQ.rfqNo}</p>
            </div>
          </div>
          <div ref={componentRef} className="print-overall-container">
            <div className="vendor-re-rfq-top-right-content">
              <div className="col-3 vendor-rfq-column">
                <p>Quote To:</p>
                <p className="mt-1">{requestedUser?.companyName || "N/A"}</p>
                <p>{requestedUser?.city || "N/A"}</p>
                <p>{requestedUser?.state + "," + requestedUser?.country || "N/A"}</p>
                <p className="mt-3">{requestedUser?.phoneNumber || "N/A"}</p>
              </div>
              <div className="col-3 vendor-rfq-column">
                <p>Customer Message:</p>
                <p className="mt-1">Xxxxxx</p>
                <p>Xxxxxx</p>
                <p>Xxxxxx</p>
              </div>
            </div>
            <div className="vendor-re-rfq-items">
              <input type="checkbox" />
              <p>Item: {selectedRFQ.item.itemDetails || "N/A"}</p>
              <div className="vr" />
              <p>Item Classification: {selectedRFQ.item.itemClassification || "N/A"}</p>
              <div className="vr" />
              <p>UOM: {selectedRFQ.item.uom || "N/A"}</p>
              <div className="vr" />
              <p>{selectedRFQ.item.quotePrice || "N/A"} SAR</p>
              <div className="vr" />
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Enter Re Price"
                    type="number"
                    {...register("reQuotePrice", { required: true })}
                  />
                </InputGroup>
              </Form.Group>
              <div className="vr" />
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    className="small-custom-textfield"
                    type="number"
                    placeholder="Tax %"
                    {...register("tax", { required: true })}
                  />
                </InputGroup>
              </Form.Group>
              <div className="vr" />
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Comments"
                    {...register("comments", { required: true })}
                  />
                </InputGroup>
              </Form.Group>
              {/* <div className="vr" />
              <div className="vendor-re-rfq-approve-btn">
                <MdDone />
                Approve
              </div> */}
            </div>
            <div className="re-rfq-bottom-content">
              <div>
                <p className="fw-bold">Comments</p>
                <p>{selectedRFQ.item.reQuoteComments || "N/A"}</p>
              </div>
              <div>
                <div className="re-rfq-discount">
                  <p className="fw-bold">Previous Value: {selectedRFQ.item.reQuotePrice || "N/A"} SAR</p>
                  <div className="d-md-flex align-items-center gap-3">
                    <p>Discount</p>
                    <Form.Group>
                      <InputGroup>
                        <Form.Control 
                        className="small-custom-textfield"
                        type="number"
                        {...register("discount", { required: true })} />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="d-md-flex align-items-center gap-3">
                    <p>Transport</p>
                    <Form.Group>
                      <InputGroup>
                        <Form.Control 
                        className="small-custom-textfield"
                        {...register("transport", { required: true })} />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="d-md-flex align-items-center gap-3">
                    <p>Loading</p>
                    <Form.Group>
                      <InputGroup>
                        <Form.Control 
                        className="small-custom-textfield"
                        {...register("loading", { required: true })} />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="d-md-flex align-items-center gap-3">
                    <p>Others</p>
                    <Form.Group>
                      <InputGroup>
                        <Form.Control 
                        className="small-custom-textfield"
                        {...register("others", { required: true })} />
                      </InputGroup>
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="re-rfq-btn-division">
            <div className="vendor-re-rfq-btns">
              <div className="rqc-approval-btn"
              onClick={handleSubmit(onSubmitReQuote)}
              >Send Re-Quote</div>
            </div>
          </div>
        </>)
        : (<div className="text-center mt-5">
            <h5>Please select an RFQ to view details.</h5>
          </div>)}
      </div>
    </div>
  );
};

export default VendorReRFQ;
