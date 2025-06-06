import { ReactSortable } from 'react-sortablejs';
import { useState } from 'react';
import { Table, Form } from "react-bootstrap";
import { MdDragIndicator, MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const PurchaseOrderTable = ({ items, setItems, createPO }) => {
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    // Recalculate amount if qty or rate changes
    if (field === "qty" || field === "rate") {
      const qty = parseFloat(updatedItems[index].qty) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].amount = (qty * rate).toFixed(2);
    }
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        sNo: items.length + 1, // Automatically set S.No
        itemDetails: "",
        itemCode: "",
        itemClassification: "",
        taxCode: "",
        uom: "",
        qty: "",
        rate: "",
        IGST: "",
        SGST: "",
        currency: "",
        amount: "",
      },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    // Re-number S.No after removal
    setItems(updatedItems.map((item, i) => ({ ...item, sNo: i + 1 })));
  };

  return (
    <div className="mt-5 mb-5 mx-4 pi-table">
      <div className="pi-table-scroll-wrapper">
        <div className="pi-table-scroll">
          <Table bordered className="text-center">
            <thead>
              <tr className="pi-table-head">
                <th colSpan="15">
                  <div className="pi-table-header-row d-flex justify-content-between align-items-center">
                    <span>Item Master</span>
                    {!createPO && <span className="edit-icon">
                      <FaRegEdit /> Edit Master
                    </span>}
                  </div>
                </th>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <th rowSpan={2}>
                  <MdDragIndicator />
                </th>
                <th rowSpan={2}>S.No</th>
                <th rowSpan={2}>Item Details</th>
                <th rowSpan={2}>Item Code</th>
                <th rowSpan={2}>Item Classification</th>
                <th rowSpan={2}>Tax Code</th>
                <th rowSpan={2}>UOM</th>
                <th rowSpan={2}>Qty</th>
                <th rowSpan={2}>Rate</th>
                <th colSpan={2}>Tax</th>
                <th rowSpan={2}>Currency</th>
                <th rowSpan={2}>Amount</th>
                {!createPO && <th rowSpan={2}>Actions</th> }
              </tr>
              <tr style={{ textAlign: "center" }}>
                <th>IGST</th>
                <th>SGST</th>
              </tr>
            </thead>
            <ReactSortable tag="tbody" list={items} setList={setItems}>
              {items.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{ fontSize: "13px", height: "35px", cursor: "move" }}
                >
                  <td style={{ width: "40px" }}>
                    <MdDragIndicator style={{ cursor: "move" }} />
                  </td>
                  <td>{item.sNo}</td>
                  <td>
                    {createPO ? (
                      item.itemDetails
                    ) : (
                      <Form.Control
                        type="text"
                        value={item.itemDetails}
                        onChange={(e) =>
                          handleItemChange(
                            rowIndex,
                            "itemDetails",
                            e.target.value
                          )
                        }
                        className="small-custom-textfield"
                      />
                    )}
                  </td>
                  <td>
                    {createPO ? (
                      item.itemCode
                    ) : (
                      <Form.Control
                        type="text"
                        value={item.itemCode}
                        onChange={(e) =>
                          handleItemChange(rowIndex, "itemCode", e.target.value)
                        }
                        className="small-custom-textfield"
                      />
                    )}
                  </td>
                  <td>
                    {createPO ? (
                      item.itemClassification
                    ) : (
                      <Form.Control
                        type="text"
                        value={item.itemClassification}
                        onChange={(e) =>
                          handleItemChange(
                            rowIndex,
                            "itemClassification",
                            e.target.value
                          )
                        }
                        className="small-custom-textfield"
                      />
                    )}
                  </td>
                  <td>
                    {createPO ? (
                      item.taxCode
                    ) : (
                      <Form.Control
                        type="text"
                        value={item.taxCode}
                        onChange={(e) =>
                          handleItemChange(rowIndex, "taxCode", e.target.value)
                        }
                        className="small-custom-textfield"
                      />
                    )}
                  </td>
                  <td>
                    {createPO ? (
                      item.uom
                    ) : (
                      <Form.Control
                        type="text"
                        value={item.uom}
                        onChange={(e) =>
                          handleItemChange(rowIndex, "uom", e.target.value)
                        }
                        className="small-custom-textfield"
                      />
                    )}
                  </td>
                  <td>
                    {createPO ? (
                      item.qty
                    ) : (
                      <Form.Control
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          handleItemChange(rowIndex, "qty", e.target.value)
                        }
                        className="small-custom-textfield"
                      />
                    )}
                  </td>
                  <td>
                    {createPO ? (
                      item.rate
                    ) : (
                      <Form.Control
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(rowIndex, "rate", e.target.value)
                        }
                        className="small-custom-textfield"
                      />
                    )}
                  </td>
                  <td>
                    {createPO ? (
                      item.IGST
                    ) : (
                      <Form.Control
                        type="number"
                        value={item.IGST}
                        onChange={(e) =>
                          handleItemChange(rowIndex, "IGST", e.target.value)
                        }
                        className="small-custom-textfield"
                      />
                    )}
                  </td>
                  <td>
                    {createPO ? (
                      item.SGST
                    ) : (
                      <Form.Control
                        type="number"
                        value={item.SGST}
                        onChange={(e) =>
                          handleItemChange(rowIndex, "SGST", e.target.value)
                        }
                        className="small-custom-textfield"
                      />
                    )}
                  </td>
                  <td>
                    {createPO ? (
                      item.currency
                    ) : (
                      <Form.Control
                        type="text"
                        value={item.currency}
                        onChange={(e) =>
                          handleItemChange(
                            rowIndex,
                            "currency",
                            e.target.value
                          )
                        }
                        className="small-custom-textfield"
                      />
                    )}
                  </td>
                  <td>
                    {createPO ? (
                      item.amount
                    ) : (
                      <Form.Control
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          handleItemChange(rowIndex, "amount", e.target.value)
                        }
                        className="small-custom-textfield"
                        readOnly // Amount is calculated automatically
                      />
                    )}
                  </td>
                  {!createPO && (
                    <td>
                      <MdDeleteOutline
                        size={20}
                        className="cursor-pointer text-danger"
                        onClick={() => removeItem(rowIndex)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </ReactSortable>
          </Table>
          {!createPO && ( // The "Add an Item" button should only appear when not in 'createPO' (view) mode
            <div className="pi-table-footer">
              <button className="add-item-button" onClick={addItem}>
                Add an Item <span>＋</span>
              </button>
              <div className="curve-line"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderTable;
