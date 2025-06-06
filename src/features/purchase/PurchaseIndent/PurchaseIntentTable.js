import React, { useState, useEffect, useRef } from "react";
import { Table, Button } from "react-bootstrap";
import { ReactSortable } from "react-sortablejs";
import { FaRegEdit } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const defaultRow = {
  itemDetails: "",
  itemCode: "",
  itemClassification: "",
  uom: "",
  requiredQty: "",
  stockQty: "",
  indentQty: "",
  previousPurchaseRate: "",
  scheduleDate: null,
  estimatedValue: "",
  previousSupplier: "",
  costCentre: "",
};

const PurchaseIndentTable = ({
  onItemsChange,
  resetTable,
  initialItems,
  selectedIndentId,
  setSelectedIndentId,
  setResetTable,
  isEditMode,
  setIsEditMode
}) => {
  const [rows, setRows] = useState(
    initialItems.length ? initialItems : [{ ...defaultRow }]
  );
  const prevIndentIdRef = useRef(null);

  useEffect(() => {
    onItemsChange(rows);
  }, [rows, onItemsChange]);

  // Reset the table when the resetTable prop changes
  useEffect(() => {
    if (resetTable  === true) {
      setRows([{ ...defaultRow }]);
      onItemsChange([{ ...defaultRow }]);
      setResetTable(false);
      setIsEditMode(true);
    }
  }, [resetTable]);

  useEffect(() => {
    if (selectedIndentId === null) {
      setRows([{ ...defaultRow }]);
    }
  }, [selectedIndentId, isEditMode]);

  const handleInputChange = (index, field, value) => {
    if (isEditMode) {
      const newRows = [...rows];
      newRows[index][field] = value;
      setRows(newRows);
    }
  };

  const addRow = () => {
    if (isEditMode) {
      setRows([...rows, { ...defaultRow }]);
    }
  };

  const deleteRow = (index) => {
    if (isEditMode) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    }
  };

  useEffect(() => {
    if (initialItems.length && rows.length === 1 && rows[0] === defaultRow) {
      setRows(initialItems);
    }
  }, []);

  useEffect(() => {
    if (selectedIndentId !== prevIndentIdRef.current) {
      if (initialItems.length) {
        setRows(initialItems);
      } else {
        setRows([{ ...defaultRow }]);
      }
      prevIndentIdRef.current = selectedIndentId;
    }
  }, [initialItems, selectedIndentId, isEditMode]);

  return (
    <div className="mt-5 mx-4 pi-table">
      <Table bordered responsive>
        <thead>
          <tr className="pi-table-head">
            <th colSpan="14" className="bg-light">
              <div className="pi-table-header-row d-flex justify-content-between align-items-center">
                <span>
                  <strong>Item Master</strong>
                </span>
                <span
                  className="edit-icon text-primary"
                  style={{ cursor: "pointer" }}
                >
                  <FaRegEdit /> Edit Master
                </span>
              </div>
            </th>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <th>
              <MdDragIndicator />
            </th>
            <th>Item Details</th>
            <th>Item Code</th>
            <th>Item Classification</th>
            <th>UOM</th>
            <th>Required Qty</th>
            <th>Stock Qty</th>
            <th>Indent Qty</th>
            <th>Previous Purchase Rate</th>
            <th>Scheduled Date</th>
            <th>Estimated Value</th>
            <th>Previous Supplier Name</th>
            <th>Cost Centre</th>
            <th>Action</th>
          </tr>
        </thead>
        <ReactSortable tag="tbody" list={rows} setList={setRows} disabled={!isEditMode}>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ fontSize: "13px", height: "35px" }}>
              <td style={{ textAlign: "center" }}>
                <MdDragIndicator />
              </td>
              {Object.keys(defaultRow).map((field) => (
                <td key={field}>
                  {field === "scheduleDate" ? (
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={
                        row[field]
                          ? new Date(row[field]).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleInputChange(rowIndex, field, e.target.value)
                      }
                      disabled={!isEditMode}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={row[field]}
                      onChange={(e) =>
                        handleInputChange(rowIndex, field, e.target.value)
                      }
                      disabled={!isEditMode}
                    />
                  )}
                </td>
              ))}
              <td style={{ textAlign: "center" }}>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteRow(rowIndex)}
                  disabled={!isEditMode}
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </ReactSortable>
      </Table>
      <div className="pi-table-footer">
        <button className="add-item-button" onClick={addRow} disabled={!isEditMode}>
          Add an Item +
        </button>
        <div className="curve-line"></div>
      </div>
    </div>
  );
};

export default PurchaseIndentTable;
