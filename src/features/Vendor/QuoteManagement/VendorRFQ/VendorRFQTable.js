import { ReactSortable } from "react-sortablejs";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDragIndicator } from "react-icons/md";

const VendorRFQTable = ({ matchedItems = [], onQuotePriceChange }) => {
  const [rows, setRows] = useState([]);
  const [quotePrices, setQuotePrices] = useState([]);

  const formatDate = (isoDate) => {
    return isoDate ? new Date(isoDate).toLocaleDateString("en-GB") : "N/A";
  };

  useEffect(() => {
    if (matchedItems.length) {
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
        item,
      ]);
      setRows(formattedRows);
      const initialPrices = matchedItems.map((item) =>
        item.quotePrice !== undefined ? item.quotePrice.toString() : ""
      );
      setQuotePrices(initialPrices);
    } else {
      setRows([]);
      setQuotePrices([]);
    }
  }, [matchedItems]);

  const handleQuotePriceChange = (index, value) => {
    const updatedPrices = [...quotePrices];
    updatedPrices[index] = value;
    setQuotePrices(updatedPrices);
  };

  return (
    <div className="mt-5 mb-5 mx-4 pi-table">
      <div className="pi-table-scroll-wrapper">
        <div className="pi-table-scroll">
          <Table bordered>
            <thead>
              <tr className="pi-table-head">
                <th colSpan="11" >
                  <div className="pi-table-header-row">
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
            <ReactSortable
              tag="tbody"
              list={rows}
              setList={setRows}
              handle=".drag-handle"
            >
              {rows.map((row, rowIndex) => (
                <tr
                  key={row[9] || rowIndex}
                  style={{ fontSize: "13px", height: "35px", cursor: "move" }}
                >
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
                  {row.slice(0, 9).map((cell, colIndex) => (
                    <td key={colIndex}>{cell}</td>
                  ))}
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={quotePrices[rowIndex]}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleQuotePriceChange(rowIndex, value);
                        onQuotePriceChange(row[9]._id, value);
                      }}
                      style={{ width: "100%", fontSize: "13px" }}
                      className="hide-on-print"
                    />
                    {quotePrices[rowIndex] ? (
                      <span className="show-on-print">
                        {quotePrices[rowIndex]}
                      </span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </ReactSortable>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default VendorRFQTable;
