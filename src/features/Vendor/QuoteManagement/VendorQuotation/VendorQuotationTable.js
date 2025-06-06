import { ReactSortable } from 'react-sortablejs';
import { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";
import { MdDragIndicator } from "react-icons/md";

const VendorQuotationTable = ({ matchedItems }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log('matchedItems:', matchedItems);
    if (!matchedItems || !Array.isArray(matchedItems)) {
      setRows([]);
      return;
    }

  const formattedRows = matchedItems.map((item, index) => [
    (index + 1).toString(),
   item.itemDetails || "N/A",
        item.itemCode || "N/A",
        item.itemClassification || "N/A",
        item.uom || "N/A",
        item.requiredQty?.toString() || "N/A",
        "N/A",
        item.previousSupplier || "N/A",
        item.previousPurchaseRate || "N/A",
        item.quotePrice || "N/A",
        
  ]);

  setRows(formattedRows);
}, [matchedItems]);


  return (
    <div className="mt-5 mb-5 mx-4 pi-table">
      <div className="pi-table-scroll-wrapper">
        <div className="pi-table-scroll">
          <Table bordered className="text-center">
            <thead>
              <tr className="pi-table-head">
                <th colSpan="14">
                  <div className="pi-table-header-row d-flex justify-content-between align-items-center">
                    <span>Item Master</span>
                  </div>
                </th>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <th>
                  <MdDragIndicator />
                </th>
                <th>S.No</th>
                <th>Item Details</th>
                <th>Item Code</th>
                <th>Item Classification</th>
                <th>UOM</th>
                <th>Required Qty</th>
                <th>Scheduled Date</th>
                <th>Previous Supplier</th>
                <th>Previous Supply Price</th>
                <th>Quote Price</th>
              </tr>
            </thead>
            <ReactSortable tag="tbody" list={rows} setList={setRows}>
              {rows.map((row, index) => (
                <tr key={index} style={{ fontSize: '13px', height: '35px', cursor: 'move' }}>
                 <td
                    className="drag-handle"
                    style={{
                      width: "40px",
                      textAlign: "center",
                      cursor: "move",
                    }}
                  >
                    <MdDragIndicator />
                  </td>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </ReactSortable>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default VendorQuotationTable;
