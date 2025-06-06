import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import { MdMoreVert } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { filteredVendorsByPI } from "../../../redux/Vendor/VendorPurchaseRequest";

const QuoteRequestSidebar = ({
  selectedVendor,
  checkedVendor,
  setCheckedVendor,
}) => {
  const [selectedColumn, setSelectedColumn] = useState(null);
  const { vendorRequest, loading, error } = useSelector(
    (state) => state.vendorRequest
  );
  const dispatch = useDispatch();
  const [purchaseRequest, setPurchaseRequest] = useState([]);

  useEffect(() => {
    if (!selectedVendor.purchaseRequests) return;

    const purchaseIndentIds = selectedVendor.purchaseRequests.map(
      (req) => req.purchaseIndentId
    );

    if (purchaseIndentIds.length > 0) {
      purchaseIndentIds.forEach((id) => {
        dispatch(filteredVendorsByPI(id));
      });
    }
  }, [selectedVendor, dispatch]);

  useEffect(() => {
    setPurchaseRequest(vendorRequest?.vendors);
  }, [vendorRequest]);

  useEffect(() => {
    console.log("Checked Vendors:", checkedVendor);
  }, [checkedVendor]);

  return (
    <div className="col-md-4 qr-sidebar">
      <div className="fixed-divider">
        <div className="qr-sidebar-top">
          <div>
            <Form.Group>
              <Form.Select className="no-border text-muted">
                <option value="" className="no-border text-muted">
                  All RFQ
                </option>
                <option className="no-border text-muted">Approved</option>
                <option className="no-border text-muted">Rejected</option>
                <option className="no-border text-muted">
                  Waiting For Approval
                </option>
              </Form.Select>
            </Form.Group>
          </div>
          <Form.Group>
            <InputGroup className="qr-input-group">
              <Form.Control
                className="qr-search-textfield"
                placeholder="Search with PI No"
              />
              <InputGroup.Text className="qr-input-group-text">
                <FaSearch className="text-muted" size={10} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <div className="pi-options">
            <div className="new-pi-btn">Create PO</div>
            <div className="more-pi-btn">
              <MdMoreVert size={14} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Table className="qr-table" bordered responsive>
          <tbody>
            {purchaseRequest?.map((vendorItem, index) => {
              const isChecked =
                Array.isArray(checkedVendor) &&
                checkedVendor.some(
                  (v) => v.purchaseIndentId === vendorItem.purchaseIndentId
                );

              return (
                <tr
                  key={vendorItem.rfqNo || index}
                  style={{
                    backgroundColor: isChecked ? "#D9E3F7" : "transparent",
                  }}
                >
                  <td
                    style={{
                      backgroundColor: isChecked ? "#D9E3F7" : "transparent",
                    }}
                  >
                    <div className="d-flex gap-4">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const currentPI = vendorItem.purchaseIndentId;

                          if (checked) {
                            setCheckedVendor((prev) => {
                              const alreadyExists = prev.some(
                                (v) => v.purchaseIndentId === currentPI
                              );
                              return alreadyExists
                                ? prev
                                : [...prev, vendorItem];
                            });
                          } else {
                            // Unchecking should not update state — skip
                          }
                        }}
                      />
                      <div>
                        <p className="mb-2">
                          PI NO: {vendorItem.purchaseIndentId}
                        </p>
                        <p className="fw-bold">RFQ NO: {vendorItem.rfqNo}</p>
                      </div>
                    </div>
                  </td>

                  <td
                    style={{
                      backgroundColor:
                        selectedColumn === index ? "#E6FBE8" : "transparent",
                    }}
                  >
                    <div className="d-flex gap-2">
                      <input
                        type="radio"
                        name="columnRadio"
                        disabled={!isChecked}
                        onChange={() => setSelectedColumn(index)}
                      />
                      <div>
                        <p>{vendorItem.vendorName}</p>
                        <div className="qr-table-amount">
                          {vendorItem.quotePrice} SAR
                        </div>
                        <p>RFQ #{vendorItem.rfqNo}</p>
                        <p>Delivery Date</p>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default QuoteRequestSidebar;
