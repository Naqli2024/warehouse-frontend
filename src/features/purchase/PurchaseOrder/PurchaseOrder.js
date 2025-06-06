import React, { useState } from "react";
import PurchaseOrderSidebar from "./PurchaseOrderSidebar";
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
import PurchaseOrderTable from "./PurchaseOrderTable";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPurchaseIndents,
  getPurchaseIndentByIndentNo,
} from "../../../redux/purchase/purchaseIndent";
import { numberToWords } from "../../../helpers/numberToWords";
import { useReactToPrint } from "react-to-print";
import {
  createPurchaseOrder,
  getPurchaseOrderNo,
} from "../../../redux/purchase/purchaseOrder";
import { toast } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";

const PurchaseOrder = () => {
  const [openPISidebar, setOpenPISidebar] = useState(true);
  const [inputType, setInputType] = useState("text");
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  const [createPO, setCreatePO] = useState(false);
  const [dropdowns, setDropdowns] = useState([""]);
  const { allIndents } = useSelector((state) => state.purchaseIndent);
  const { purchaseOrder } = useSelector((state) => state.purchaseOrder);
  const dispatch = useDispatch();
  const componentRef = React.useRef(null);
  console.log(purchaseOrder);

  const transportModes = ["Air", "Road", "Sea", "Rail"];
  const handleSelect = (selectedList) => {
    setFormData((prev) => ({
      ...prev,
      modeOfTransportation: selectedList.map((item) => item.name),
    }));
  };

  const handleRemove = (selectedList) => {
    setFormData((prev) => ({
      ...prev,
      modeOfTransportation: selectedList.map((item) => item.name),
    }));
  };

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Purchase Order Details",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  // State to hold all form data
  const [formData, setFormData] = useState({
    purchaseIndentNo: "",
    purchaseOrderNo: "PO-00001",
    monthlyContract: "",
    currency: "",
    deliveryDate: "",
    purchaseOrderDate: "",
    paymentTerms: "",
    advancePayment: "",
    transportation: "",
    modeOfTransportation: [],
    purchaseTo: "ABC Vendor Pvt Ltd", // Hardcoded for now, can be stateful
    deliverTo: "XYZ Pvt Ltd", // Hardcoded for now, can be stateful
    items: [],
    transport: "",
    loading: "",
    discount: "",
    grandTotal: "",
  });

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

  // Effect to calculate grand total whenever items, transport, loading, or discount changes
  useEffect(() => {
    const totalItemsAmount = formData.items.reduce((sum, item) => {
      const itemTotal = parseFloat(item.qty || 0) * parseFloat(item.rate || 0);
      const igstAmount = itemTotal * (parseFloat(item.IGST || 0) / 100);
      const sgstAmount = itemTotal * (parseFloat(item.SGST || 0) / 100);
      return sum + itemTotal + igstAmount + sgstAmount;
    }, 0);
    const total =
      totalItemsAmount +
      parseFloat(formData.transport || 0) +
      parseFloat(formData.loading || 0) -
      parseFloat(formData.discount || 0);
    // Round the grand total to the nearest integer
    const roundedTotal = Math.round(total);
    setFormData((prevData) => ({
      ...prevData,
      grandTotal: roundedTotal.toFixed(2),
    }));
  }, [formData.items, formData.transport, formData.loading, formData.discount]);

  const toggleSidebar = () => {
    setOpenPISidebar((prev) => !prev);
    setIsManuallyToggled(true);
  };

  const handleDropdownChange = (index, value) => {
    const updated = [...dropdowns];
    updated[index] = value;
    setDropdowns(updated);
    setFormData((prevData) => ({
      ...prevData,
      modeOfTransportation: updated.filter((mode) => mode !== ""),
    }));
  };

  const addDropdown = () => {
    setDropdowns([...dropdowns, ""]);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "purchaseIndentNo" && value) {
      try {
        const fetchedIndent = await dispatch(
          getPurchaseIndentByIndentNo(value)
        ).unwrap();

        setFormData((prevData) => ({
          ...prevData,
          currency: fetchedIndent.currency || prevData.currency,
          items: fetchedIndent.items || prevData.items,
          monthlyContract:
            fetchedIndent.monthlyContract || prevData.monthlyContract,
        }));
      } catch (error) {
        toast.error(`Failed to load indent details: ${error.message || error}`);
      }
    }
  };

  const handleCreatePO = () => {
    setCreatePO(true);
    // Construct the req.body when "Create PO" is clicked
    const reqBody = {
      purchaseIndentNo: formData.purchaseIndentNo,
      purchaseOrderNo: formData.purchaseOrderNo,
      monthlyContract: formData.monthlyContract,
      currency: formData.currency,
      deliveryDate: formData.deliveryDate,
      purchaseOrderDate: formData.purchaseOrderDate,
      paymentTerms: formData.paymentTerms,
      advancePayment: formData.advancePayment,
      transportation: formData.transportation,
      modeOfTransportation: formData.modeOfTransportation,
      purchaseTo: formData.purchaseTo,
      deliverTo: formData.deliverTo,
      items: formData.items.map((item) => ({
        itemDetails: item.itemDetails,
        itemCode: item.itemCode,
        itemClassification: item.itemClassification,
        taxCode: item.taxCode,
        uom: item.uom,
        qty: parseFloat(item.qty),
        rate: parseFloat(item.rate),
        IGST: parseFloat(item.IGST),
        SGST: parseFloat(item.SGST),
        currency: item.currency,
        amount: parseFloat(item.amount),
      })),
      transport: parseFloat(formData.transport),
      loading: parseFloat(formData.loading),
      discount: parseFloat(formData.discount),
      grandTotal: parseFloat(formData.grandTotal),
    };
    console.log("Request Body:", reqBody);
    dispatch(createPurchaseOrder(reqBody))
      .unwrap()
      .then((response) => toast.success(response.message))
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    dispatch(getAllPurchaseIndents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPurchaseOrderNo())
      .unwrap()
      .then((response) =>
        setFormData((prev) => ({
          ...prev,
          purchaseOrderNo: response,
        }))
      );
  }, [dispatch]);

  return (
    <div>
      <div className="purchase-order-container">
        {openPISidebar && <PurchaseOrderSidebar />}
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
              <p>
                Purchase Order{" "}
                {createPO ? formData.purchaseOrderNo : "#0000345"}
              </p>
            </div>
            <div className="pi-head-options">
              {!createPO && (
                <>
                  <div className="pi-option-divider" />
                  <p className="d-flex align-items-center gap-1">
                    <MdOutlineEdit size={15} />
                    Edit
                  </p>
                  <div className="pi-option-divider" />
                </>
              )}
              {createPO && (
                <>
                  <div className="pi-option-divider" />
                  <p
                    className="d-flex align-items-center gap-1"
                    onClick={reactToPrintFn}
                  >
                    <MdOutlineLocalPrintshop size={15} />
                    Print
                  </p>
                  <div className="pi-option-divider" />
                </>
              )}
              <p className="d-flex align-items-center gap-1">
                <MdDeleteOutline size={15} />
                Delete
              </p>
              <div className="pi-option-divider" />
              <p
                className={
                  createPO
                    ? "d-flex align-items-center gap-1 text-secondary"
                    : "d-flex align-items-center gap-1"
                }
              >
                <FaRegSave size={15} />
                Save
              </p>
            </div>
          </div>
          <div ref={componentRef}>
            <div className="d-md-flex flex-column">
              <div className="po-top-right-content">
                <div className="col-md-3 pi-first-column">
                  <img
                    src={PurchaseIndentLogo}
                    alt="purchase-order"
                    className={createPO && "mt-5"}
                  />
                  <p className="mt-3">Grandag Saudi Ltd,</p>
                  <p>Xxxx</p>
                  <p className="mb-3">Xxxxxxx</p>
                  <p>91 97947 13297</p>
                  {!createPO && (
                    <div className="mt-4">
                      <Form.Group>
                        <InputGroup className="mt-2">
                          <Form.Control
                            className="small-custom-textfield"
                            placeholder="PO Date"
                            type={inputType}
                            name="purchaseOrderDate"
                            value={formData.purchaseOrderDate}
                            onChange={handleInputChange}
                            onFocus={() => setInputType("date")}
                            onBlur={(e) => {
                              if (!e.target.value) setInputType("text");
                            }}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>
                  )}
                </div>
                {createPO ? (
                  <div
                    className={
                      createPO
                        ? "mt-3 col-md-6 po-save-container"
                        : "col-md-6 po-save-container"
                    }
                  >
                    <div className="diagonal-badge-container">
                      <div className="diagonal-badge">Sent</div>
                    </div>
                    <p className="po-save-heading">Purchase Order</p>
                    <div className="d-md-flex">
                      <div className="col-md-4 po-save-top-data">
                        <div className="d-flex gap-2">
                          <p>PO Date:</p>
                          <p>{formData.purchaseOrderDate}</p>
                        </div>
                        <div className="d-flex gap-2">
                          <p>PO No:</p>
                          <p>{formData.purchaseOrderNo}</p>
                        </div>
                        <div className="d-flex gap-2">
                          <p>Supply:</p>
                          <p>Domestic</p>
                        </div>
                        <div className="d-flex gap-2">
                          <p>Currency:</p>
                          <p>{formData.currency}</p>
                        </div>
                      </div>
                      <div className="col-md-4 po-save-top-data">
                        <div className="d-flex gap-2">
                          <p>Payment Terms:</p>
                          <p>{formData.paymentTerms}</p>
                        </div>
                        <div className="d-flex gap-2">
                          <p>Mode:</p>
                          <p>{formData.monthlyContract}</p>
                        </div>
                        <div className="d-flex gap-2">
                          <p>Delivery Date:</p>
                          <p>{formData.deliveryDate}</p>
                        </div>
                        <div className="d-flex gap-2">
                          <p>Advance Payment:</p>
                          <p>{formData.advancePayment}</p>
                        </div>
                      </div>
                    </div>
                    <div className="po-save-transport">
                      <div className="po-horizontal-divider" />
                      <div className="d-flex align-items-center">
                        <p>Transport Mode</p>
                        {formData.modeOfTransportation.map((mode, index) => (
                          <React.Fragment key={index}>
                            <div className="po-transport-divider" />
                            <p>
                              {index + 1}.{mode}
                            </p>
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="po-horizontal-divider" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="col-md-3 pi-second-column">
                      <Form.Group>
                        <InputGroup>
                          <Form.Control
                            className="small-custom-textfield"
                            placeholder="PO No: #0000345"
                            name="purchaseOrderNo"
                            value={formData.purchaseOrderNo}
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <InputGroup className="mt-2">
                          <Form.Select
                            className="small-custom-textfield"
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                          >
                            <option value="">Currency</option>
                            <option>SAR</option>
                            <option>INR</option>
                            <option>USD</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <InputGroup className="mt-2">
                          <Form.Select
                            className="small-custom-textfield"
                            name="paymentTerms"
                            value={formData.paymentTerms}
                            onChange={handleInputChange}
                          >
                            <option value="">Payment Terms</option>
                            <option>On receiving Goods</option>
                            <option>7 Days</option>
                            <option>10 Days</option>
                            <option>15 Days</option>
                            <option>30 Days</option>
                            <option>45 Days</option>
                            <option>60 Days</option>
                            <option>75 Days</option>
                            <option>90 Days</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </div>
                    <div className="col-md-3 pi-second-column">
                      <Form.Group>
                        <InputGroup>
                          <Form.Select
                            className="small-custom-textfield"
                            name="monthlyContract"
                            value={formData.monthlyContract}
                            onChange={handleInputChange}
                          >
                            <option value="">Monthly Contract</option>
                            <option>One Time Purchase</option>
                            <option>Yearly Rate Contract</option>
                            <option>Contract#02</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <InputGroup className="mt-2">
                          <Form.Control
                            className="small-custom-textfield"
                            placeholder="Delivery Date"
                            type={inputType}
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleInputChange}
                            onFocus={() => setInputType("date")}
                            onBlur={(e) => {
                              if (!e.target.value) setInputType("text");
                            }}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <InputGroup className="mt-2">
                          <Form.Select
                            className="small-custom-textfield"
                            name="advancePayment"
                            value={formData.advancePayment}
                            onChange={handleInputChange}
                          >
                            <option value="">Advance Payment</option>
                            <option>0%</option>
                            <option>10%</option>
                            <option>25%</option>
                            <option>50%</option>
                            <option>75%</option>
                            <option>100%</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </div>
                  </>
                )}
              </div>
              {!createPO && (
                <div className="po-dropdown-container">
                  <div className="col-md-3 po-domestic-drp">
                    <Form.Group>
                      <InputGroup className="mt-2">
                        <Form.Select
                          className="small-custom-textfield"
                          name="transportation"
                          value={formData.transportation}
                          onChange={handleInputChange}
                        >
                          <option value="Domestic">Domestic</option>
                          <option value="International">International</option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="col-md-3 po-domestic-drp">
                    <Form.Group>
                      <InputGroup className="mt-2">
                        <Form.Select
                          className="small-custom-textfield"
                          name="purchaseIndentNo"
                          value={formData.purchaseIndentNo}
                          onChange={handleInputChange}
                        >
                          <option value="">Purchase Indent No</option>
                          {Array.isArray(allIndents) &&
                            allIndents.map((indent, index) => (
                              <option key={index} value={indent.indentNo}>
                                {indent.indentNo}
                              </option>
                            ))}
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="col-md-3 transport-mode-selector">
                    <Multiselect
                      options={transportModes.map((mode) => ({ name: mode }))}
                      selectedValues={formData.modeOfTransportation.map(
                        (mode) => ({ name: mode })
                      )}
                      onSelect={handleSelect}
                      onRemove={handleRemove}
                      displayValue="name"
                      placeholder="Transport Mode"
                      style={{
                        multiselectContainer: {
                          width: "100%",
                        },
                        searchBox: {
                          width: "100%",
                          fontSize: "10px",
                          minHeight: "30px",
                          padding: "2px 6px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        },
                        chips: {
                          fontSize: "10px",
                          background: "#007bff",
                        },
                      }}
                    />
                  </div>

                  {/* <div className="transport-mode-selector">
                    <span className="me-3 text-muted">Transport Mode</span>
                    <div className="vr mx-2" />
                    {dropdowns.map((value, index) => (
                      <div key={index} className="d-flex align-items-center">
                        <Form.Select
                          value={value}
                          onChange={(e) =>
                            handleDropdownChange(index, e.target.value)
                          }
                          className="border-0 shadow-none"
                          style={{
                            width: "120px",
                            height: "30px",
                            fontSize: "10px",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="By road">By Road</option>
                          <option value="Air freight">Air Freight</option>
                          <option value="Seaway">Seaway</option>
                        </Form.Select>
                        <div className="vr mx-2" />
                      </div>
                    ))}
                    <div className="ms-auto d-flex align-items-center">
                      <button className="add-btn ms-2" onClick={addDropdown}>
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
            {!createPO 
            ? (<div className="po-order-to-container">
                  <div className="col-md-3 po-domestic-drp">
                    <Form.Group>
                      <InputGroup className="mt-2">
                        <Form.Select
                          className="small-custom-textfield"
                          name="transportation"
                        >
                          <option value="">Purchase Order To</option>
                          <option value="">1</option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="col-md-3 po-domestic-drp">
                    <Form.Group>
                      <InputGroup className="mt-2">
                        <Form.Select
                          className="small-custom-textfield"
                          name="transportation"
                          onChange={handleInputChange}
                        >
                          <option value="">Deliver To</option>
                          <option value="">1</option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="col-md-3"></div>
                </div>)
                :( <div
              className= "col-md-6 purchase-deliver-to mt-0">
              <div className="purchaser-order-to">
                <p className="mb-3 fw-bold">Purchase order To</p>
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
              <div className="purchaser-order-to">
                <p className="mb-3 fw-bold">Deliver To</p>
                <div className="d-flex">
                  <div>
                    <p className="fw-bold">Grandag Saudi Ltd,</p>
                    <p>Vendor Id: xxxxx</p>
                    <p>xxxxxx</p>
                    <p>91 97947 13297</p>
                  </div>
                </div>
              </div>
            </div>)
            }
            <PurchaseOrderTable
              items={formData.items}
              setItems={(newItems) =>
                setFormData((prevData) => ({ ...prevData, items: newItems }))
              }
              createPO={createPO}
            />
            {createPO && (
              <div className="purchaser-order-to ms-5">
                <p>
                  Amount In words :{" "}
                  {numberToWords(
                    parseFloat(formData.grandTotal),
                    formData.currency
                  )}
                </p>
              </div>
            )}
            <div className="po-discount">
              <div className="d-flex align-items-center gap-3">
                <p>Transport</p>
                {createPO ? (
                  <p>
                    {formData.transport} {formData.currency}
                  </p>
                ) : (
                  <Form.Group>
                    <InputGroup>
                      <Form.Control
                        className="po-custom-textfield"
                        name="transport"
                        value={formData.transport}
                        onChange={handleInputChange}
                        type="number"
                      />
                    </InputGroup>
                  </Form.Group>
                )}
              </div>
              <div className="d-flex align-items-center gap-3">
                <p>
                  {!createPO && (
                    <AiOutlinePlusCircle className="me-2 cursor-pointer" />
                  )}
                  Loading
                </p>
                {createPO ? (
                  <p>
                    {formData.loading} {formData.currency}
                  </p>
                ) : (
                  <Form.Group>
                    <InputGroup>
                      <Form.Control
                        className="po-custom-textfield"
                        name="loading"
                        value={formData.loading}
                        onChange={handleInputChange}
                        type="number"
                      />
                    </InputGroup>
                  </Form.Group>
                )}
              </div>
              <div className="d-flex align-items-center gap-3">
                <p>Discount</p>
                {createPO ? (
                  <p>
                    {formData.discount} {formData.currency}
                  </p>
                ) : (
                  <Form.Group>
                    <InputGroup>
                      <Form.Control
                        className="po-custom-textfield"
                        name="discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                        type="number"
                      />
                    </InputGroup>
                  </Form.Group>
                )}
              </div>
              <div className="po-grand-total">
                GRAND TOTAL: {formData.grandTotal} {formData.currency}
              </div>
            </div>
            <div className="pi-bottom-content">
              <div></div>
              {createPO ? (
                <div className="pi-signs mt-5 me-3">
                  <div className="pi-bottom-sign">
                    <p className="text-muted">Amir</p>
                    <p>CFO</p>
                    <p>Grandag Saudi Ltd,</p>
                  </div>
                  <div className="pi-bottom-sign">
                    <p className="text-muted">Rohit Peter</p>
                    <p>Managing Director</p>
                    <p>Grandag Saudi Ltd,</p>
                  </div>
                </div>
              ) : (
                <div className="pi-signs">
                  <div className="po-create-po-btn" onClick={handleCreatePO}>
                    Create PO
                  </div>
                  <div className="po-send-btn">Send for Authorization</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
