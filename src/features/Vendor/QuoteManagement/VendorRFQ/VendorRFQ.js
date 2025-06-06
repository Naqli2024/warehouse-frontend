import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import {
  MdOutlineEdit,
  MdOutlineLocalPrintshop,
  MdDeleteOutline,
} from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import PurchaseIndentLogo from "../../../../assets/images/purchase-indent.svg";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import VendorRFQSidebar from "./VendorRFQSidebar";
import VendorRFQTable from "./VendorRFQTable";
import {
  deletePurchaseRequest,
  getVendorById,
  sendQuote,
} from "../../../../redux/Vendor/VendorSlice";
import { getPurchaseIndentById } from "../../../../redux/purchase/purchaseIndent";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

const VendorRFQ = () => {
  const [openPISidebar, setOpenPISidebar] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  const [selectedRFQs, setSelectedRFQs] = useState([]);
  const [selectedMatchedItems, setSelectedMatchedItems] = useState([]);
  const [vendorData, setVendorData] = useState(null);
  const [quotePrices, setQuotePrices] = useState([]);
  const [purchaseIndentId, setPurchaseIndentId] = useState(null);
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendorReducer.vendors);
  const purchaseRequests = vendors?.purchaseRequests || [];

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

  const handleQuotePriceChange = (itemId, price) => {
    setQuotePrices((prev) => {
      const exists = prev.find((item) => item._id === itemId);
      if (exists) {
        return prev.map((item) =>
          item._id === itemId ? { ...item, quotePrice: price } : item
        );
      } else {
        return [...prev, { _id: itemId, quotePrice: price }];
      }
    });
  };

  const handleSendQuote = () => {
    const sanitizedQuotes = quotePrices
      .filter(
        (item) =>
          item._id &&
          item.quotePrice !== "" &&
          !isNaN(item.quotePrice) &&
          Number(item.quotePrice) >= 0
      )
      .map((item) => ({
        _id: item._id,
        quotePrice: parseFloat(item.quotePrice),
      }));

    if (
      !vendorData?._id ||
      !purchaseIndentId ||
      sanitizedQuotes.length !== selectedMatchedItems.length
    ) {
      toast.error("Please fill in all quote prices correctly before sending.");
      return;
    }

    dispatch(
      sendQuote({
        vendorId: vendorData._id,
        purchaseIndentId,
        itemQuotes: sanitizedQuotes,
      })
    )
      .unwrap()
      .then((response) => {
        toast.success(response.message, {autoClose: 2000});
      })
      .catch((err) => {
        toast.error("Failed to send quote: " + err);
      });
  };

  const handleDeclineRFQ = () => {
    if (!vendorData?._id || !purchaseIndentId) {
      toast.error("Missing vendor or indent info.");
      return;
    }

    dispatch(
      deletePurchaseRequest({ vendorId: vendorData._id, purchaseIndentId })
    )
      .unwrap()
      .then(() => {
        toast.success("RFQ declined successfully.");

        setSelectedRFQs([]);
        setSelectedMatchedItems([]);
        setQuotePrices([]);
        setPurchaseIndentId(null);

        dispatch(getVendorById(vendorData._id));
      })
      .catch((err) => {
        toast.error("Failed to decline RFQ: " + err);
      });
  };

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

  const formatDate = (isoDate) =>
    isoDate ? new Date(isoDate).toLocaleDateString("en-GB") : "N/A";

    const handleAfterPrint = React.useCallback(() => {
      console.log("onAfterPrint called");
    }, []);
   
    const handleBeforePrint = React.useCallback(() => {
      console.log("onBeforePrint called");
      return Promise.resolve();
    }, []);

  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Purchase Order Details",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  return (
    <div className="purchase-order-container">
      {openPISidebar && (
        <VendorRFQSidebar
          selectedRFQs={selectedRFQs}
          onSelectionChange={setSelectedRFQs}
          onUserChange={setUserInfo}
          onMatchedItemsChange={setSelectedMatchedItems}
          onIndentIdChange={setPurchaseIndentId}
          onVendorChange={setVendorData}
        />
      )}

      <div className="d-flex">
        <div className="vendor-rfq-divider" />
      </div>

      <div className={openPISidebar ? "col-10" : "col-12"}>
        {selectedRFQs && selectedRFQs.length > 0 ? (
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
                <p>Request For Quote #{selectedRFQs}</p>
              </div>
              <div className="pi-head-options">
                <div className="pi-option-divider" />
                <p className="d-flex align-items-center gap-1">
                  <MdOutlineEdit size={15} />
                  Edit
                </p>
                <div className="pi-option-divider" />
                <p
                  className="d-flex align-items-center gap-1 cursor-pointer"
                  onClick={reactToPrintFn}
                >
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

            <div ref={componentRef} className="print-overall-container">
              <div className="vendor-rfq-top-right-content">
                <div className="col-md-3 vendor-rfq-first-column">
                  <img src={PurchaseIndentLogo} alt="purchase-order" />
                  <p className="mt-3">
                    {vendorData?.personalInformation?.companyName || "N/A"}
                  </p>
                  <p>{vendorData?.personalInformation?.companyType || "N/A"}</p>
                  <p className="mb-3">
                    {vendorData?.personalInformation?.country || "N/A"}
                  </p>
                  <p>
                    {vendorData?.personalInformation?.contactNumber || "N/A"}
                  </p>
                  <div className="vendor-rfq-date">
                    Indent Date: {formatDate(purchaseIndent?.indentDate)}
                  </div>
                </div>
                <div className="col-md-3 vendor-rfq-column">
                  <p>Indent No: #{purchaseIndent?.indentNo || "N/A"}</p>
                  <p>
                    Authorized Person:{" "}
                    {purchaseIndent?.authorizedPerson || "N/A"}
                  </p>
                  <p>{purchaseIndent?.indentType || "N/A"}</p>
                  <p>
                    Monthly Contract: {purchaseIndent?.monthlyContract || "N/A"}
                  </p>
                </div>
                <div className="col-md-3 vendor-rfq-column">
                  <p>Delivery To</p>
                  <div className="vendor-deliver-to">
                    <p className="mt-3">{userInfo?.companyName || "N/A"}</p>
                    <p>{userInfo?.city || "N/A"}</p>
                    <p>{userInfo?.state + "," + userInfo?.country || "N/A"}</p>
                    <p className="mt-3">{userInfo?.phoneNumber || "N/A"}</p>
                  </div>
                </div>
              </div>

              <VendorRFQTable
                matchedItems={selectedMatchedItems}
                onQuotePriceChange={handleQuotePriceChange}
              />

              <div className="vendor-rfq-bottom">
                <p>Approved Date: {formatDate(purchaseIndent?.approvedDate)}</p>
                <div className="d-flex">
                  <div className="me-5">
                    <p>{purchaseIndent?.cfoName || "N/A"}</p>
                    <p>CFO</p>
                    <p>{userInfo?.companyName || "N/A"}</p>
                  </div>
                  <div>
                    <p>{purchaseIndent?.managingDirectorName || "N/A"}</p>
                    <p>Managing Director</p>
                    <p>{userInfo?.companyName || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="vendor-rfq-btns">
              <div className="rqc-debit-btn" onClick={handleDeclineRFQ}>
                Decline RFQ
              </div>
              <div className="rqc-approval-btn" onClick={handleSendQuote}>
                Send Quote
              </div>
            </div>
          </>
        ) : (
          <div className="text-center mt-5">
            <h5>Please select an RFQ to view details.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorRFQ;
