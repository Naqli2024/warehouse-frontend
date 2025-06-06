import Dashboard from "../assets/images/dashboard-logo.svg";
import Warehouse from "../assets/images/warehouse-logo.svg";
import Purchase from "../assets/images/purchase-logo.svg";
import Inventory from "../assets/images/inventory-logo.svg";
import Employees from "../assets/images/employees-logo.svg";

export const dashboardItems = [
  { item: "Dashboard", path: "dashboard",
    image: Dashboard},
  {
    item: "Purchase",
    path: "purchase",
    image: Purchase,
    submenus: [
      { item: "Purchase Indent", path: "purchase-indent" },
      { item: "Request For Quote", path: "quote-request" },
      { item: "Purchase Order", path: "purchase-order" },
      { item: "ASN", path: "asn" },
      { item: "Receiving QC", path: "receiving-qc" },
      { item: "GRN", path: "grn" },
      { item: "Inventory New Item", path: "inventory-new-item" },
      { item: "Put", path: "put" },
      { item: "Debit Note", path: "debit-note" },
      { item: "Item Best Price", path: "item-best-price" }
    ],
  },
  {
    item: "Inventory management",
    path: "inventory-management",
    image: Inventory,
    submenus: [
      { item: "Items", path: "items" },
      { item: "Sales", path: "sales" },
      { item: "Sales order", path: "salesorder" },
      { item: "Packages", path: "packages" },
      { item: "Shipments", path: "shipments" },
      { item: "Delivery challans", path: "delivery-challans" },
      { item: "Sales return", path: "sales-return" },
      { item: "Sales invoice", path: "sales-invoice" },
      { item: "Credit note", path: "credit-note" },
      { item: "Source department", path: "source-department" },
      { item: "Customer", path: "customer" },
      { item: "Category", path: "category" },
    ],
  },
  { item: "Warehouse management",
    path: "warehouse-management",
    image: Warehouse,
    submenus: [
      {item: "Storage",path: "storage"},
      {item: "Floor management",path: "warehouse"},
      {item: "Transfer log",path: "transfer-log"},
    ]
   },
  { item: "Employees", path: "employees", image: Employees },
];

