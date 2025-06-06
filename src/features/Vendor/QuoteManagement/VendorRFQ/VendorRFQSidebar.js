import React, { useEffect } from "react";
import { MdMoreVert } from "react-icons/md";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../../redux/auth/userSlice";
import Cookies from "js-cookie";
import { getVendorById } from "../../../../redux/Vendor/VendorSlice";

const VendorRFQSidebar = ({
  selectedRFQs,
  onSelectionChange,
  onUserChange,
  onMatchedItemsChange,
  onIndentIdChange,
  onVendorChange,
}) => {
  const dispatch = useDispatch();
  const { vendor } = useSelector((state) => state.vendorReducer);
  const users = useSelector((state) => state.user?.users || {});

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

  useEffect(() => {
    if (vendor?.purchaseRequests?.length > 0) {
      const uniqueRequesters = [
        ...new Set(vendor.purchaseRequests.map((req) => req.requestedBy)),
      ];
      uniqueRequesters.forEach((id) => {
        if (id && !users[id]) {
          console.log("req", id);
          dispatch(getUserById(id));
        }
      });
    }
  }, [vendor, dispatch, users]);

  const handleCheckboxChange = (
    rfqNo,
    userId,
    purchaseIndentId,
    matchedItems
  ) => {
    if (selectedRFQs.includes(rfqNo)) {
      onSelectionChange([]);
      onUserChange(null);
      onMatchedItemsChange([]);
      onIndentIdChange(null);
    } else {
      const user = users[userId];
      onSelectionChange([rfqNo]);
      onUserChange(user || null);
      onMatchedItemsChange(matchedItems || []);
      onIndentIdChange(purchaseIndentId);
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
            <div className="more-pi-btn">
              <MdMoreVert size={14} />
            </div>
          </div>
        </div>
        <div className="pi-divider"></div>
      </div>

      {vendor?.purchaseRequests?.length > 0 ? (
        vendor.purchaseRequests.map((request, index) => {
          const rfqNo = request?.rfqNo || `N/A`;
          const estimatedSum = request?.matchedItems?.reduce(
            (sum, item) => sum + (item.estimatedValue || 0),
            0
          );
          const requestedBy = request?.requestedBy;
          const user = users[requestedBy];

          return (
            <div key={request._id || index}>
              <label className="pi-sidebar-list">
                <input
                  type="checkbox"
                  className="pi-checkbox"
                  checked={selectedRFQs.includes(rfqNo)}
                  onChange={() =>
                    handleCheckboxChange(
                      rfqNo,
                      requestedBy,
                      request.purchaseIndentId,
                      request.matchedItems
                    )
                  }
                />
                <div className="pi-content">
                  <div className="d-flex flex-column">
                    <p>RFQ NO: {rfqNo}</p>
                    <p>
                      Estimated Valuation:{" "}
                      {estimatedSum > 0 ? estimatedSum.toFixed(2) : "N/A"}
                    </p>
                  </div>
                </div>
                <p>{user ? user.companyName : "Loading..."}</p>
              </label>
              <div className="pi-divider"></div>
            </div>
          );
        })
      ) : (
        <p className="d-flex justify-content-center p-5 small-text">
          No Purchase Requests
        </p>
      )}
    </div>
  );
};

export default VendorRFQSidebar;
