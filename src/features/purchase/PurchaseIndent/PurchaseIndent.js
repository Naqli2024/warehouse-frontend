import { useEffect, useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { MdMoreVert } from "react-icons/md";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import PurchaseIndentLogo from "../../../assets/images/purchase-indent.svg";
import { useDispatch, useSelector } from "react-redux";
import PurchaseIndentTable from "./PurchaseIntentTable";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import {
  createPurchaseIndent,
  deletePurchaseIndent,
  getAllPurchaseIndents,
  getIndentNo,
  updatePurchaseIndent,
} from "../../../redux/purchase/purchaseIndent";
import { useNavigate } from "react-router-dom";

const PurchaseIndent = () => {
  const [openPISidebar, setOpenPISidebar] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [items, setItems] = useState([]);
  const [resetTable, setResetTable] = useState(false);
  const dispatch = useDispatch();
  const { purchaseIndent } = useSelector((state) => state.purchaseIndent);
  const [inputType, setInputType] = useState("text");
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  const [allPurchaseIndents, setAllPurchaseIndents] = useState([]);
  const [areOptionsEnabled, setAreOptionsEnabled] = useState(false);
  const [initialTableRows, setInitialTableRows] = useState([]);
  const [selectedIndent, setSelectedIndent] = useState(null);
  const [selectedIndentId, setSelectedIndentId] = useState(null);
  const [refreshIndents, setRefreshIndents] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    indentNo: purchaseIndent || "",
    indentType: "",
    indentDate: null,
    monthlyContract: "",
    authorizedPerson: "",
    requestedBy: "",
    deliveredTo: "",
  });

  const handleItemsChange = (newItems) => {
    setItems(newItems);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    if (date) {
      if (dayjs.isDayjs(date) && date.isValid()) {
        setFormData({ ...formData, indentDate: date.toISOString() });
      } else {
        console.error("Invalid Dayjs object received:", date);
      }
    } else {
      setFormData({ ...formData, indentDate: null });
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        items: items.map((item) => ({
          itemDetails: item.itemDetails,
          itemCode: item.itemCode,
          itemClassification: item.itemClassification,
          uom: item.uom,
          requiredQty: parseFloat(item.requiredQty),
          stockQty: parseFloat(item.stockQty),
          indentQty: parseFloat(item.indentQty),
          scheduleDate: item.scheduleDate,
          estimatedValue: parseFloat(item.estimatedValue),
          previousPurchaseRate: parseFloat(item.previousPurchaseRate),
          previousSupplier: item.previousSupplier,
          costCentre: item.costCentre,
        })),
      };

      dispatch(createPurchaseIndent(payload))
        .unwrap()
        .then((response) => {
          toast.success(response.message, { autoClose: 2000 });
          setIsSubmitted(true);
          resetForm();
          setResetTable(true);
          setSelectedIndent(null);
          setSelectedIndentId(null);
          setItems([]);
          setRefreshIndents(true);
        });
    } catch (error) {
      toast.error(error?.message || "An error occurred");
    }
  };

  const resetForm = (isNewPI = false) => {
    setFormData({
      indentNo: "",
      indentType: "",
      indentDate: null,
      monthlyContract: "",
      authorizedPerson: "",
      requestedBy: "",
      deliveredTo: "",
    });
    setItems([]);
    setIsSubmitted(true);
    setResetTable(true);
    setInitialTableRows([]);
    setSelectedIndent(null);
    setSelectedIndentId(null);
    setAreOptionsEnabled(false);
    if(!isNewPI) {
      setIsEditMode(false);
    }
  };

  const handleIndentClick = (indent) => {
    setFormData({
      indentNo: indent.indentNo || "",
      indentType: indent.indentType || "",
      indentDate: indent.indentDate || null,
      monthlyContract: indent.monthlyContract || "",
      authorizedPerson: indent.authorizedPerson || "",
      requestedBy: indent.requestedBy || "",
      deliveredTo: indent.deliveredTo || "",
    });

    const tableRows = indent.items.map((item) => ({
      itemDetails: item.itemDetails || "",
      itemCode: item.itemCode || "",
      itemClassification: item.itemClassification,
      uom: item.uom || "",
      requiredQty: item.requiredQty?.toString() || "",
      stockQty: item.stockQty?.toString() || "",
      indentQty: item.indentQty?.toString() || "",
      previousPurchaseRate: item.previousPurchaseRate?.toString() || "",
      scheduleDate: item.scheduleDate || null,
      estimatedValue: item.estimatedValue?.toString() || "",
      previousSupplier: item.previousSupplier || "",
      costCentre: item.costCentre || "",
    }));

    setSelectedIndent(indent);
    setItems(indent.items || []);
    setResetTable(false);
    setIsSubmitted(false);
    setInitialTableRows(tableRows);
    setAreOptionsEnabled(true);
    setIsEditMode(false);
  };

  const handleDeleteIndent = (indentNo) => {
    dispatch(deletePurchaseIndent(indentNo))
      .unwrap()
      .then((response) => {
        toast.success(response.message, { autoClose: 2000 });
        // Update local state by removing the deleted indent
        setAllPurchaseIndents((prev) =>
          prev.filter((indent) => indent.indentNo !== indentNo)
        );
        resetForm();
        // Fetch new indent number and update formData
        dispatch(getIndentNo())
          .unwrap()
          .then((newIndentNo) => {
            setFormData((prev) => ({
              ...prev,
              indentNo: newIndentNo,
            }));
          });
      })
      .catch((error) => {
        const message =
          error?.payload?.message ||
          error?.message ||
          error?.response?.data?.message ||
          "Something went wrong";

        if (
          message === "Authorization token missing" ||
          message === "Unauthorized access. Token may be invalid or expired."
        ) {
          toast.error("Session expired. Please log in again.");
          localStorage.clear();
          navigate("/login");
        } else {
          toast.error(message);
        }
      });
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    if (!selectedIndent?.indentNo) {
      toast.error("Cannot save. No Indent No found.");
      return;
    }

    const payload = {
      ...formData,
      items: items.map((item) => ({
        itemDetails: item.itemDetails,
        itemCode: item.itemCode,
        itemClassification: item.itemClassification,
        uom: item.uom,
        requiredQty: parseFloat(item.requiredQty),
        stockQty: parseFloat(item.stockQty),
        indentQty: parseFloat(item.indentQty),
        scheduleDate: item.scheduleDate,
        estimatedValue: parseFloat(item.estimatedValue),
        previousPurchaseRate: parseFloat(item.previousPurchaseRate),
        previousSupplier: item.previousSupplier,
        costCentre: item.costCentre,
      })),
    };

    try {
      const response = await dispatch(
        updatePurchaseIndent({
          indentNo: selectedIndent.indentNo,
          data: payload,
        })
      ).unwrap();
      toast.success(response.message, { autoClose: 2000 });
      setIsEditMode(false);
      setRefreshIndents(true);
    } catch (error) {
      toast.error(error?.message || "Failed to update Purchase Indent.");
    }
  };

  const handleNewPIClick = () => {
    resetForm(true);
    setIsEditMode(true);
    setSelectedIndentId(null);
    setSelectedIndent(null);
    setResetTable(true);
    setItems([]);
    dispatch(getIndentNo())
      .unwrap()
      .then((response) =>
        setFormData((prev) => ({
          ...prev,
          indentNo: response,
        }))
      );
  };

  useEffect(() => {
    dispatch(getIndentNo())
      .unwrap()
      .then((response) =>
        setFormData((prev) => ({
          ...prev,
          indentNo: response,
        }))
      );
  }, []);

  useEffect(() => {
    dispatch(getAllPurchaseIndents())
      .unwrap()
      .then((response) => setAllPurchaseIndents(response));
  }, []);

  useEffect(() => {
    if (selectedIndentId === null) {
      resetForm();
    }
  }, [selectedIndentId]);

  useEffect(() => {
    if (refreshIndents) {
      dispatch(getAllPurchaseIndents())
        .unwrap()
        .then((response) => {
          setAllPurchaseIndents(response);
          setRefreshIndents(false);
        });
    }
  }, [refreshIndents]);

  return (
    <div className="purchase-indent-container">
      {openPISidebar && (
        <div className="col-md-2 pi-sidebar">
          <div className="fixed-divider">
          <div className="pi-top-option">
            <div className="col-auto mt-2">
              <Form.Group>
                <Form.Select className="no-border text-muted">
                  <option value="" className="no-border text-muted">
                    All
                  </option>
                  <option className="no-border text-muted">Approved</option>
                  <option className="no-border text-muted">Rejected</option>
                  <option className="no-border text-muted">
                    Waiting For Approval
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="pi-options">
              <div className="new-pi-btn" onClick={handleNewPIClick}>
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
          <div>
            {allPurchaseIndents.length > 0 ? (
              allPurchaseIndents.map((indents) => {
                const totalEstimatedValue = indents.items?.reduce(
                  (sum, item) => {
                    const value = parseFloat(item.estimatedValue) || 0;
                    return sum + value;
                  },
                  0
                );

                return (
                  <>
                    <label
                      key={indents._id}
                      className={`pi-sidebar-list ${
                        selectedIndentId === indents._id ? "selected" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="pi-checkbox me-2"
                        checked={selectedIndentId === indents._id}
                        onChange={() => {
                          if (selectedIndentId === indents._id) {
                            setSelectedIndentId(null);
                            setSelectedIndent(null);
                            setItems([]);
                            dispatch(getIndentNo())
                              .unwrap()
                              .then((response) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  indentNo: response,
                                }))
                              );
                            setIsEditMode(false);
                          } else {
                            setSelectedIndentId(indents._id);
                            setSelectedIndent(indents);
                            handleIndentClick(indents);
                            setIsEditMode(false);
                          }
                        }}
                      />
                      <div className="pi-content me-1">
                        <div className="d-flex flex-column">
                          <p>PI NO: {indents.indentNo}</p>
                          <p>{indents.indentType || "Purchase Indent"}</p>
                        </div>
                      </div>
                      <p>{totalEstimatedValue.toLocaleString()} SAR</p>
                    </label>
                    <div className="pi-divider"></div>
                  </>
                );
              })
            ) : (
              <p>No Indents found</p>
            )}
          </div>
        </div>
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
            <p>Purchase Indent {selectedIndent?.indentNo || ""}</p>
          </div>
          <div className="pi-head-options">
            <div className="pi-option-divider" />
            <p
              className={`d-flex align-items-center gap-1 ${
                !areOptionsEnabled ? "disabled-option" : ""
              }`}
              onClick={areOptionsEnabled ? handleEditClick : undefined}
            >
              <MdOutlineEdit size={15} />
              Edit
            </p>
            <div className="pi-option-divider" />
            <p
              className={`d-flex align-items-center gap-1 ${
                !areOptionsEnabled ? "disabled-option" : ""
              }`}
            >
              <MdOutlineLocalPrintshop size={15} />
              Print
            </p>
            <div className="pi-option-divider" />
            <p
              className={`d-flex align-items-center gap-1 ${
                !areOptionsEnabled ? "disabled-option" : ""
              }`}
              onClick={() => handleDeleteIndent(formData.indentNo)}
            >
              <MdDeleteOutline size={15} />
              Delete
            </p>
            <div className="pi-option-divider" />
            <p
              className={`d-flex align-items-center gap-1 ${
                !areOptionsEnabled || !isEditMode
                  ? "disabled-option"
                  : "cursor-pointer"
              }`}
              onClick={
                areOptionsEnabled && isEditMode ? handleSaveClick : undefined
              }
            >
              <FaRegSave size={15} />
              Save
            </p>
          </div>
        </div>
        <div className="d-md-flex flex-column">
          <div className="pi-top-right-content">
            <div className="col-md-3 pi-first-column">
              <img src={PurchaseIndentLogo} alt="purchase-indent" />
              <p className="mt-3">Grandag Saudi Ltd,</p>
              <p>Xxxx</p>
              <p className="mb-3">Xxxxxxx</p>
              <p>91 97947 13297</p>
              <div className="mt-4">
                <Form.Group>
                  <InputGroup className="mt-2">
                    <Form.Control
                      className="small-custom-textfield"
                      placeholder="Indent Date"
                      type={inputType}
                      onFocus={() => setInputType("date")}
                      value={
                        formData.indentDate
                          ? dayjs(formData.indentDate).format("YYYY-MM-DD")
                          : ""
                      }
                      onChange={(e) => handleDateChange(dayjs(e.target.value))}
                      onBlur={(e) => {
                        if (!e.target.value) setInputType("text");
                      }}
                      disabled={selectedIndentId !== null && !isEditMode}
                    />
                  </InputGroup>
                </Form.Group>
                {/* <Form.Group>
                  <InputGroup>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Indent Date"
                          value={
                            formData.indentDate
                              ? dayjs(formData.indentDate)
                              : null
                          } // Ensure value is a Dayjs object or null
                          onChange={handleDateChange}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              size: "small",
                              name: "indentDate",
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </InputGroup>
                </Form.Group> */}
              </div>
            </div>
            <div className="col-md-3 pi-second-column">
              <Form.Group>
                <InputGroup className="mt-2">
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Indent No: #0000345"
                    name="indentNo"
                    value={formData.indentNo || ""}
                    onChange={handleFormChange}
                    disabled={selectedIndentId !== null && !isEditMode}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup className="mt-2">
                  <Form.Select
                    className="small-custom-textfield"
                    name="authorizedPerson"
                    value={formData.authorizedPerson}
                    onChange={handleFormChange}
                    disabled={selectedIndentId !== null && !isEditMode}
                  >
                    <option value="">Authorized Person</option>
                    <option>Person 1</option>
                    <option>Person 2</option>
                    <option>Person 3</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup className="mt-2">
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Requested By"
                    name="requestedBy"
                    value={formData.requestedBy}
                    onChange={handleFormChange}
                    disabled={selectedIndentId !== null && !isEditMode}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-md-3 pi-second-column">
              <Form.Group>
                <InputGroup className="mt-2">
                  <Form.Select
                    className="small-custom-textfield"
                    name="monthlyContract"
                    value={formData.monthlyContract}
                    onChange={handleFormChange}
                    disabled={selectedIndentId !== null && !isEditMode}
                  >
                    <option value="Monthly Contract">Monthly Contract</option>
                    <option value="One Time Purchase">One Time Purchase</option>
                    <option value="Yearly Rate Contract">
                      Yearly Rate Contract
                    </option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup className="mt-2">
                  <Form.Select
                    className="small-custom-textfield"
                    name="indentType"
                    value={formData.indentType}
                    onChange={handleFormChange}
                    disabled={selectedIndentId !== null && !isEditMode}
                  >
                    <option value="Indent Type">Indent Type</option>
                    <option value="Purchase Indent">Purchase Indent</option>
                    <option value="Store Indent Request">
                      Store Indent Request
                    </option>
                    <option value="Capital Indent">Capital Indent</option>
                    <option value="Project Indent">Project Indent</option>
                    <option value="Repair & Maintenance Indent">
                      Repair & Maintenance Indent
                    </option>
                    <option value="Emergency Indent">Emergency Indent</option>
                    <option value="Trial/Development Indent">
                      Trial/Development Indent
                    </option>
                    <option value="Production Indent">Production Indent</option>
                    <option value="Service Indent">Service Indent</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup className="mt-2">
                  <Form.Select
                    className="small-custom-textfield"
                    name="deliveredTo"
                    value={formData.deliveredTo}
                    onChange={handleFormChange}
                    disabled={selectedIndentId !== null && !isEditMode}
                  >
                    <option value="Warehouse 1">Warehouse 1</option>
                    <option value="Warehouse 2">Warehouse 2</option>
                    <option value="Warehouse 3">Warehouse 3</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <PurchaseIndentTable
            onItemsChange={handleItemsChange}
            resetTable={resetTable}
            initialItems={selectedIndent?.items || []}
            selectedIndentId={selectedIndentId}
            setSelectedIndentId={setSelectedIndentId}
            setResetTable={setResetTable}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
          {selectedIndentId ? (
            <div className="pi-bottom-content">
              <div>Approved Date:</div>
              <div className="pi-signs">
                <div className="pi-bottom-sign">
                  <p className="text-muted">Amir</p>
                  <p>CFO</p>
                  <p>Grandag Saudi Ltd,</p>
                  <div className="pi-get-quote-btn">Get Quote</div>
                </div>
                <div className="pi-bottom-sign">
                  <p className="text-muted">Rohit Peter</p>
                  <p>Managing Director</p>
                  <p>Grandag Saudi Ltd,</p>
                  <div className="pi-quick-po-btn">Quick PO</div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="d-flex justify-content-end mt-3"
              onClick={handleSubmit}
            >
              <div className="pi-submit-btn">Submit for Approval</div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PurchaseIndent;
