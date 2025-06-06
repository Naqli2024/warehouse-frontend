import React, { useState } from 'react'

const QuoteHistory = () => {
  const bestSellingData = [
    { name: 'Quote Rejection Rate', value: 30 },
    { name: 'Quote Approval Rate', value: 50 },
  ];
  const inventoryData = [
      {
      id: 1,
      companyName: '',
      rfqNo: '',
      quoteNo: '',
      reQuoteNo: '',
      approximateOrderValue: '',
      quoteValue: '',
      reQuoteValue: '',
      status: 'RFQ received',
    },
         {
      id: 2,
      companyName: '',
      rfqNo: '',
      quoteNo: '',
      reQuoteNo: '',
      approximateOrderValue: '',
      quoteValue: '',
      reQuoteValue: '',
      status: 'Waiting Response',
    },
         {
      id: 3,
      companyName: '',
      rfqNo: '',
      quoteNo: '',
      reQuoteNo: '',
      approximateOrderValue: '',
      quoteValue: '',
      reQuoteValue: '',
      status: 'Rejected',
    },
         {
      id: 4,
      companyName: '',
      rfqNo: '',
      quoteNo: '',
      reQuoteNo: '',
      approximateOrderValue: '',
      quoteValue: '',
      reQuoteValue: '',
      status: 'Accepted',
    },
  ];
  const [activeTab, setActiveTab] = useState("incoming");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleStatusClick = (id) => {
  console.log("Status button clicked for ID:", id);
};
const getStatusButtonClass = (status) => {
  switch (status) {
    case 'RFQ received':
      return 'btn btn-sm quote-history-received-button';
    case 'Waiting Response':
      return 'btn btn-sm quote-history-waiting-button';
    case 'Rejected':
      return 'btn btn-sm quote-history-rejected-button';
    case 'Accepted':
      return 'btn btn-sm quote-history-accepted-button';
    default:
      return 'btn btn-sm btn-secondary';
  }
};


  const renderContent = () => {
    if (activeTab === "incoming") {
      return (
       <div className="table quote-history-table-responsive">
          <table className="quote-history-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>RFQ No</th>
                <th>Quote No</th>
                <th>Re-Quote No</th>
                <th>Approximate Order Value</th>
                <th>Quote Value</th>
                <th>Re - Quote Value</th>
                <th>Status</th>
              </tr>
            </thead>
<tbody>
  {inventoryData.map((data, index) => (
    <tr key={index}>
      <td>{data.companyName}</td>
      <td>{data.rfqno}</td>
      <td>{data.quoteNo}</td>
      <td>{data.reQuoteNo}</td>
      <td>{data.approximateOrderValue}</td>
      <td>{data.quoteValue}</td>
      <td>{data.reQuoteValue}</td>
      <td>
        <button
          className={getStatusButtonClass(data.status)}
          onClick={() => handleStatusClick(data.id)}
        >
          {data.status}
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="text-center text-muted mt-5 fw-bold">
          No data available.
        </div>
      );
    }
  };
  const [selectedIds, setSelectedIds] = useState([]);
  const toggleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  return (
      <div className="quote-history-main-card">
        <div className="row mb-3 gx-3 gy-3 align-items-start ">
          <div className="col-lg-9 col-md-8 col-11 mb-2">
            <div className="ms-4" >
              <h4 className="mb-5 quote-history-heading">Quote History</h4>
              <div className="quote-history-item-list-standalone">
                {bestSellingData.map((item, index) => (
                  <div className="row g-0 mb-4" key={index}>
                    <div className="col-3 col-sm-2">
                      <span className="quote-history-item-name-standalone">{item.name}</span>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                      <div className="progress w-100 quote-history-progress-bar-custom-standalone mb-2">
                        <div
                          className="progress-bar quote-history-progress-bar-fill-standalone"
                          role="progressbar"
                          style={{ width: `${item.value}%` }}
                          aria-valuenow={item.value}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
                <div className="row ms-2">
     <div className="col-md-3 me-1 g-4">
          <div className=" quote-history-stat-card justify-content-center align-items-start">
            <h6>Incoming Quotes</h6>
            <h3 className='quote-history-total-items-standalone'>125</h3>
          </div>
        </div>
        <div className="col-md-3 me-1 g-4">
          <div className="quote-history-stat-card justify-content-center align-items-start">
            <h6>Approved Quotes</h6>
            <h3 className='quote-history-total-items-standalone'>85</h3>
          </div>
        </div>
        <div className="col-md-3 g-4">
          <div className="quote-history-stat-card justify-content-center align-items-start">
            <h6>Rejected Quotes</h6>
            <h3 className='quote-history-total-items-standalone'>40</h3>
          </div>
        </div>
      </div>
         </div> 
        </div>
        <div className="row">
          <ul className="nav quote-history-nav-tabs quote-history-tab-list">
            <li className="nav-item me-4 quote-history-nav-item">
              <button
                className={`quote-history-nav-link ${activeTab === "incoming" ? "active" : ""}`}
                onClick={() => handleTabChange("incoming")}
              >
                Incoming ASN
              </button>
            </li>
            <li className="nav-item me-4 quote-history-nav-item">
              <button
                className={`quote-history-nav-link ${activeTab === "arriving" ? "active" : ""}`}
                onClick={() => handleTabChange("arriving")}
              >
                Arriving Today
              </button>
            </li>
            <li className="nav-item me-4 quote-history-nav-item">
              <button
                className={`quote-history-nav-link ${activeTab === "cancelled" ? "active" : ""}`}
                onClick={() => handleTabChange("cancelled")}
              >
                Cancelled
              </button>
            </li>
            <li className="nav-item me-4 quote-history-nav-item">
              <button
                className={`quote-history-nav-link ${activeTab === "completed" ? "active" : ""}`}
                onClick={() => handleTabChange("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="quote-history-tab-underline mb-5"></div>
          {renderContent()}
        </div>
      </div>
  );
}

export default QuoteHistory