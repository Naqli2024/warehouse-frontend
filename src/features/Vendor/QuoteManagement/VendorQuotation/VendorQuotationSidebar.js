import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdMoreVert } from "react-icons/md";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getVendorById } from "../../../../redux/Vendor/VendorSlice";
import Cookies from "js-cookie";

const VendorQuotationSidebar = ({ onSelectRFQ,  onVendorChange }) => {
  const dispatch = useDispatch();
  const { vendor } = useSelector((state) => state.vendorReducer);
  const [selectedQuotes, setSelectedQuotes] = useState({});

  useEffect(() => {
    const id = Cookies.get("_id");
    if (id) {
      dispatch(getVendorById(id));
    }
  }, [dispatch]);

    useEffect(() => {
    if (vendor) {
      onVendorChange(vendor);
    }
  }, [vendor, onVendorChange]);

  const handleCheckboxChange = (quote, request, item) => {
    const isChecked = !selectedQuotes[quote._id];
    const updatedSelections = {
      ...selectedQuotes,
      [quote._id]: isChecked,
    };
    setSelectedQuotes(updatedSelections);

    if (isChecked) {
      const requestedBy = request?.requestedBy;
      const purchaseIndentId = request?.purchaseIndentId;
      const rfqNo = request?.rfqNo;
      const quoteNo = quote?.quoteNo ?? 0;
      onSelectRFQ({
        quote,
        rfqNo,
        requestedBy,
        purchaseIndentId,
        item,
        quoteNo,
      });
    } else {
      onSelectRFQ(null);
    }
  };

  return (
    <div className="col-md-2 po-sidebar">
      <div className="fixed-divider">
        <div className="pi-top-option">
          <div className="col-auto mt-2">
            <Form.Group>
              <Form.Select className="no-border text-muted">
                <option value="">All RFQ</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Waiting For Approval</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="pi-options">
            <div className="new-pi-btn">
              <FaPlus size={12} />
              New PI
            </div>
            <div className="more-pi-btn">
              <MdMoreVert size={14} />
            </div>
          </div>
        </div>
        <div className="pi-divider"></div>
      </div>
      {vendor?.purchaseRequests?.map((request) =>
        request.matchedItems?.map((item) =>
          item.reQuoteRequest?.map((quote) => (
            <div key={quote._id}>
              <label className="pi-sidebar-list">
                <input
                  type="checkbox"
                  className="pi-checkbox"
                 checked={!!selectedQuotes[quote._id]}
                  onChange={() => handleCheckboxChange(quote, request, item)}
                />
                <div className="pi-content">
                  <div className="d-flex flex-column">
                    <p>Quote No: {quote.quoteNo}</p>
                    <p>RFQ No: {request.rfqNo}</p>
                  </div>
                </div>
                <p>{item.quotePrice?.toLocaleString()} SAR</p>
              </label>
              <div className="pi-divider"></div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default VendorQuotationSidebar;
