import React, { useRef, useState } from "react";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import PurchaseIndentLogo from "../../../../assets/images/purchase-indent.svg";
import PurchaseOrderCompanyLogo from "../../../../assets/images/quote-request-logo.svg";
import { useEffect } from "react";
import VendorQuotationSidebar from "./VendorQuotationSidebar";
import VendorQuotationTable from "./VendorQuotationTable";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getVendorById } from "../../../../redux/Vendor/VendorSlice";
import { getPurchaseIndentById } from "../../../../redux/purchase/purchaseIndent";
import { getUserById } from "../../../../redux/auth/userSlice";

const VendorQuotation = () => {
  const [openPISidebar, setOpenPISidebar] = useState(true);
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [requestedUser, setRequestedUser] = useState(null);
  const [purchaseIndentId, setPurchaseIndentId] = useState(null);
  const [vendorData, setVendorData] = useState(null);
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendorReducer.vendors);
  const purchaseRequests = vendors?.purchaseRequests || [];
  const formatDate = (isoDate) =>isoDate ? new Date(isoDate).toLocaleDateString("en-GB") : "N/A";

  useEffect(() => {
    if (vendors) {
      setVendorData(vendors);
    }
  }, [vendors]);

  useEffect(() => {
    if (purchaseRequests.length > 0 && purchaseRequests[0].purchaseIndentId) {
      setPurchaseIndentId(purchaseRequests[0].purchaseIndentId);
    }
  }, [purchaseRequests]);

  const purchaseIndent = useSelector(
    (state) => state.purchaseIndent?.purchaseIndent
  );

  useEffect(() => {
    const id = Cookies.get("_id");
    if (id) {
      dispatch(getVendorById(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (purchaseIndentId) {
      dispatch(getPurchaseIndentById(purchaseIndentId));
    }
  }, [dispatch, purchaseIndentId]);

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

  return (
    <div>
      <div className="purchase-order-container">
        {openPISidebar && <VendorQuotationSidebar 
        onSelectRFQ={setSelectedRFQ}
         onVendorChange={setVendorData}/>}
        <div className="d-flex">
        <div className="vendor-rfq-divider"/>
      </div>
        <div className={openPISidebar ? "col-10" : "col-12"}>
          {selectedRFQ ? (
          <div>
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
              <p>Quotation #{selectedRFQ.rfqNo}</p>
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
          <div className="quotation-top-right-content">
            <div className="purchaser-order-to">
              <div className="d-flex gap-3">
                <img src={PurchaseOrderCompanyLogo} alt="purchase-order" />
                <div>
                  <p className="mt-3 fw-bold">
                    {vendorData?.personalInformation?.companyName || "N/A"}
                  </p>
                  <p>Vendor Id: {vendorData?._id || "N/A"}</p>
                  <p>{vendorData?.personalInformation?.companyType || "N/A"}</p>
                  <p className="mb-3">
                    {vendorData?.personalInformation?.country || "N/A"}
                  </p>
                  <p>
                    {vendorData?.personalInformation?.contactNumber || "N/A"}
                  </p>
                </div>
              </div>
              <div className="purchaser-order-to mt-5">
                <div className="d-flex gap-3">
                  <img src={PurchaseIndentLogo} alt="purchase-order" />
                  <div>
                   <p className="mt-1 fw-bold">{requestedUser?.companyName || "N/A"}</p>
                    <p>{requestedUser?.city || "N/A"}</p>
                    <p>{requestedUser?.state + "," + requestedUser?.country || "N/A"}</p>
                    <p className="mt-3">{requestedUser?.phoneNumber || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 vendor-rfq-column">
               <p>Indent No: #{purchaseIndent?.indentNo || "N/A"}</p>
                  <p>
                    Authorized Person:{" "}
                    {purchaseIndent?.authorizedPerson || "N/A"}
                  </p>
                  <p>{purchaseIndent?.indentType || "N/A"}</p>
                  <p>
                    Monthly Contract: {purchaseIndent?.monthlyContract || "N/A"}
                  </p>
              <div className="purchaser-order-to mt-5">
                <p className="mb-2 fw-bold">Deliver To</p>
                <div className="d-flex">
                  <div>
                    <p className="mt-1 fw-bold">{requestedUser?.firstName + " " + requestedUser?.lastName || "N/A"}</p>
                    <p>{requestedUser?.emailId || "N/A"}</p>
                    <p>{requestedUser?.state + "," + requestedUser?.country || "N/A"}</p>
                    <p className="mt-3">{requestedUser?.phoneNumber || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-start justify-content-start vendor-rfq-column">
              <div className="quotation-text mb-2">Quotation</div>
              <p>Quotation Date: {formatDate(selectedRFQ.item.quoteSubmissionDate || "N/A")}</p>
              <p>Quotation No: {selectedRFQ?.quoteNo || 0}</p>
            </div>
          </div>
          <VendorQuotationTable matchedItems={vendorData.purchaseRequests[0].matchedItems}/>
          </div>)
          : (<div className="text-center mt-5">
            <h5>Please select an RFQ to view details.</h5>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default VendorQuotation;
