import React, { useState } from "react";
import { useEffect } from "react";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CompanyLogo1 from "../../../assets/images/quote-request-logo.svg";
import CompanyLogo2 from "../../../assets/images/quote-request-logo1.svg";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { MdArrowRight } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import QuoteRequestSidebar from "./QuoteRequestSidebar";
import NegotiateQuoteRequest from "./NegotiateQuoteRequest";
import {
  getAllPurchaseIndents,
  getPurchaseIndentById,
} from "../../../redux/purchase/purchaseIndent";
import { useDispatch, useSelector } from "react-redux";
import { getVendorById } from "../../../redux/Vendor/VendorSlice";

const QuoteRequest = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openPISidebar, setOpenPISidebar] = useState(true);
  const [openNegotiate, setOpenNegotiate] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  const [allPurchaseIndents, setAllPurchaseIndents] = useState([]);
  const dispatch = useDispatch();
  const vendorId = allPurchaseIndents[0]?.vendorsSourcedForQuote[0]?.vendorId;
  const [selectedVendor, setSelectedVendor] = useState([]);
  const [checkedVendor, setCheckedVendor] = useState([]);
  const [checkedPurchaseIndent, setCheckedPurchaseIndent] = useState([]);
  console.log("checkedVendor:", checkedVendor);
  console.log("checkedPurchaseIndent:", checkedPurchaseIndent);

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

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(112, 112, 112, 0.2)",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#9FF5CD",
    },
  }));

  useEffect(() => {
    dispatch(getAllPurchaseIndents())
      .unwrap()
      .then((response) => {
        setAllPurchaseIndents(response);
        if (
          response.length > 0 &&
          response[0]?.vendorsSourcedForQuote.length > 0
        ) {
          const initialVendorId =
            response[0].vendorsSourcedForQuote[0].vendorId;
          dispatch(getVendorById(initialVendorId))
            .unwrap()
            .then((vendorData) => {
              setSelectedVendor(vendorData);
            });
        }
      });
  }, [dispatch]);

  useEffect(() => {
    if (vendorId) {
      dispatch(getVendorById(vendorId));
    }
  }, [vendorId, dispatch]);

  useEffect(() => {
    const uniqueIndentIds = [
      ...new Set(checkedVendor.map((v) => v.purchaseIndentId).filter(Boolean)),
    ];

    if (uniqueIndentIds.length === 0) {
      setCheckedPurchaseIndent([]); // clear if none selected
      return;
    }

    const fetchIndents = async () => {
      try {
        const responses = await Promise.all(
          uniqueIndentIds.map((id) =>
            dispatch(getPurchaseIndentById(id)).unwrap()
          )
        );
        setCheckedPurchaseIndent(responses);
      } catch (error) {
        console.error("Error fetching purchase indents:", error);
      }
    };

    fetchIndents();
  }, [checkedVendor, dispatch]);

  return (
    <div className="qr-container">
      {openPISidebar && (
        <QuoteRequestSidebar
          selectedVendor={selectedVendor}
          checkedVendor={checkedVendor}
          setCheckedVendor={setCheckedVendor}
        />
      )}
      <div className={!openPISidebar ? "col-md-12" : "col-md-8"}>
        <div
          className={
            !openPISidebar
              ? "col-md-8 qr-right-content"
              : "col-md-8 qr-right-content"
          }
        >
          <div className="qr-toggle-btn">
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
          </div>
          <div className="d-flex justify-content-between">
            <div className="qr-right-top">
              <p>Indent Date: 22/05/2025</p>
              <p>Indent No: #0000345</p>
              <p>Estimated Value: 16,000 SAR</p>
            </div>
            <div className="qr-right-top">
              <p>Purchase Indent No: 22/05/2025</p>
              <p>RFQ No: #0000345</p>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    className="date-drop-textfield"
                    placeholder="Sort By Delivery Date"
                    type={inputType}
                    onFocus={() => setInputType("date")}
                    onBlur={(e) => {
                      if (!e.target.value) setInputType("text");
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <hr className="m-0" />
          {!isDropdownOpen ? (
            <div className="expanded-qr-outer m-3">
              <input type="checkbox" className="me-2" />
              <div className="expanded-qr-card">
                <div className="expanded-qr-card-header">
                  <img src={CompanyLogo1} alt="CompanyLogo1" />
                  <div className="d-flex flex-column gap-1">
                    <div className="qr-company">Indruck Systems Ltd</div>
                    <p>Vendor Id: XXXX</p>
                    <p>XXXXX</p>
                    <p>+975 99999 99999</p>
                  </div>
                  <div className="qr-card-divider" />
                  <div className="d-flex flex-column">
                    <p>Proposed Value</p>
                    <p className="fw-bold mb-2">20,000 SAR</p>
                    <p>Previous Costing</p>
                    <p className="fw-bold">18,000 SAR</p>
                    <hr className="p-0 m-1" />
                    <p>Terms & Instructions</p>
                  </div>
                  <div className="qr-card-divider" />
                  <div className="d-flex flex-column gap-2">
                    <p>Single Batch Delivery</p>
                    <p>Transport: By Road</p>
                    <p>Delivery By: 23/05/2025</p>
                  </div>
                  <div className="qr-card-divider" />
                  <div>
                    <Stack spacing={1} className="mb-2">
                      <Rating name="size-small" defaultValue={2} size="small" />
                    </Stack>
                    <hr className="p-0 m-1" />
                    <Stack spacing={1}>
                      <div className="d-flex align-items-center gap-2 ">
                        <p className="mb-0 col-5">Delivery</p>
                        <div className="flex-grow-1 col-7">
                          <BorderLinearProgress
                            variant="determinate"
                            value={50}
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 ">
                        <p className="mb-0 col-5">Quality</p>
                        <div className="flex-grow-1 col-7">
                          <BorderLinearProgress
                            variant="determinate"
                            value={50}
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 ">
                        <p className="mb-0 col-5">Cost</p>
                        <div className="flex-grow-1 col-7">
                          <BorderLinearProgress
                            variant="determinate"
                            value={50}
                          />
                        </div>
                      </div>
                    </Stack>
                  </div>
                </div>
                <div className="expanded-inner-card">
                  <Table className="qr-table mt-4" bordered responsive>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th colSpan={3}>Item Details</th>
                        <th>Item Code</th>
                        <th>Item Classification</th>
                        <th>UOM</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th colSpan={2}>Tax</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td colSpan={3}></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan={11}></td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="qr-card-sub-total">
                    <p>Transport: 2000 SAR</p>
                    <p>Loading: 1000 SAR</p>
                    <p className="mb-3 mt-3">Discount: 1000 SAR</p>
                    <div className="qr-grand-total">
                      GRAND TOTAL: 22,000 SAR
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between m-3">
                    <div className="expanded-qr-sign">
                      <p>Rakesh</p>
                      <p>Managing Director</p>
                      <p>Indruck Systems Ltd</p>
                    </div>
                    <div className="original-quote-btn">
                      View Original Quote
                    </div>
                  </div>
                </div>
                <div
                  className="expanded-qr-dropdown-arrow"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {isDropdownOpen ? (
                    <MdArrowRight size={20} />
                  ) : (
                    <MdArrowDropUp size={20} />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex m-3">
              <input type="checkbox" className="me-2" />
              <div className="qr-card-container">
                <div className="qr-card">
                  <img src={CompanyLogo1} alt="CompanyLogo1" />
                  <div className="d-flex flex-column gap-1">
                    <div className="qr-company">Indruck Systems Ltd</div>
                    <p>Vendor Id: XXXX</p>
                    <p>XXXXX</p>
                    <p>+975 99999 99999</p>
                  </div>
                  <div className="qr-card-divider" />
                  <div>
                    <p>Proposed Value</p>
                    <p className="fw-bold mb-2">19,000 SAR</p>
                    <p>Previous Costing</p>
                    <p className="fw-bold">18,000 SAR</p>
                  </div>
                  <div className="qr-card-divider" />
                  <div className="d-flex flex-column gap-2">
                    <p>No of Batch: 2</p>
                    <p>Transport: By Road</p>
                    <p>Delivery By: 23/05/2025</p>
                  </div>
                  <div className="qr-card-divider" />
                  <div>
                    <Stack spacing={1} className="mb-2">
                      <Rating name="size-small" defaultValue={2} size="small" />
                    </Stack>
                    <Stack spacing={1}>
                      <div className="d-flex align-items-center gap-2 ">
                        <p className="mb-0 col-5">Delivery</p>
                        <div className="flex-grow-1 col-7">
                          <BorderLinearProgress
                            variant="determinate"
                            value={50}
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 ">
                        <p className="mb-0 col-5">Quality</p>
                        <div className="flex-grow-1 col-7">
                          <BorderLinearProgress
                            variant="determinate"
                            value={50}
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 ">
                        <p className="mb-0 col-5">Cost</p>
                        <div className="flex-grow-1 col-7">
                          <BorderLinearProgress
                            variant="determinate"
                            value={50}
                          />
                        </div>
                      </div>
                    </Stack>
                  </div>
                </div>
                <div
                  className="qr-dropdown-arrow"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {isDropdownOpen ? (
                    <MdArrowRight size={20} />
                  ) : (
                    <MdArrowDropUp size={20} />
                  )}
                </div>
              </div>
            </div>
          )}
          {openNegotiate && <NegotiateQuoteRequest />}
          <div className="qr-btns">
            <div className="confirm-vendor-btn">Confirm Vendor</div>
            <div className="generate-po-btn">Generate PO</div>
            <div
              className="negotiate-btn"
              onClick={() => setOpenNegotiate(true)}
            >
              {openNegotiate ? "Request Re- Quote" : "Negotiate"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;
