import TotalWarehouse from "../assets/images/total-warehouse.svg";
import DocksFull from "../assets/images/warehouse-logo.svg";
import DocksEmpty from "../assets/images/dock-empty.svg";
import Unloading from "../assets/images/unloading.svg";
import Purchase from "../assets/images/purchase.svg";
import PutAway from "../assets/images/putaway.svg";
import OrderPacking from "../assets/images/order-packing.svg";
import Shipping from "../assets/images/shipping.svg";
import Returns from "../assets/images/returns.svg";
export const overAllData = [
  {
    image: TotalWarehouse,
    name: "Warehouses",
    count: 5,
  },
  {
    image: DocksFull,
    name: "Total Docks Full",
    count: 4454,
  },
  {
    image: DocksEmpty,
    name: "Dock Empty",
    count: 5675,
  },
];
 
export const productData = [
  {
    image: Unloading,
    name: "Unloading",
    count: 10000,
  },
  {
    image: Purchase,
    name: "Purchase",
    count: 5645,
  },
  {
    image: PutAway,
    name: "Putaway",
    count: 5645,
  },
  {
    image: OrderPacking,
    name: "Orders Packing",
    count: 20000,
  },
  {
    image: Shipping,
    name: "Shipping",
    count: 600,
  },
  {
    image: Returns,
    name: "Returns",
    count: 600,
  },
];
 
export const salesAnalysis = [
  { item: "Category 1", data: "34" },
  { item: "Category 2", data: "56" },
  { item: "Category 3", data: "35" },
  { item: "Category 4", data: "30" },
];
 
export const StockAvailable = [
  { stock: "In stock", data: "90" },
  { stock: "Out of stock", data: "10" },
];
 
export const productSaleData = [
  { month: "Jan", data: { GrossMargin: 30000, Revenue: 15000 } },
  { month: "Feb", data: { GrossMargin: 60000, Revenue: 40000 } },
  { month: "Mar", data: { GrossMargin: 45000, Revenue: 70000 } },
  { month: "Apr", data: { GrossMargin: 50000, Revenue: 15000 } },
  { month: "May", data: { GrossMargin: 30000, Revenue: 15000 } },
  { month: "Jun", data: { GrossMargin: 70000, Revenue: 35000 } },
  { month: "Jul", data: { GrossMargin: 45000, Revenue: 25000 } },
  { month: "Aug", data: { GrossMargin: 60000, Revenue: 30000 } },
  { month: "Sep", data: { GrossMargin: 70000, Revenue: 40000 } },
  { month: "Oct", data: { GrossMargin: 30000, Revenue: 60000 } },
  { month: "Nov", data: { GrossMargin: 50000, Revenue: 60000 } },
  { month: "Dec", data: { GrossMargin: 40000, Revenue: 60000 } },
];
 
export const salesActivity = [
  { category: "To be Packed", data: "12" },
  { category: "To be Shipped", data: "25" },
  { category: "To be Delivered", data: "55" },
];
 
export const topSellingItems = [
  {name: "Cheese", QtySold: "1000", Revenue: "5000 SAR"},
  {name: "Milk", QtySold: "2000", Revenue: "5000 SAR"},
  {name: "Biscuits", QtySold: "5000", Revenue: "5000 SAR"},
  { name: "Cheese", QtySold: "1000", Revenue: "5000 SAR" },
  { name: "Milk", QtySold: "2000", Revenue: "5000 SAR" },
  { name: "Biscuits", QtySold: "5000", Revenue: "5000 SAR" },
  { name: "Cheese", QtySold: "1000", Revenue: "5000 SAR" },
  { name: "Milk", QtySold: "2000", Revenue: "5000 SAR" },
  { name: "Biscuits", QtySold: "5000", Revenue: "5000 SAR" },
];
 
export const products = [
  {
    name: "Product 1",
    sku: "SKU-XXXXXX",
    stock: 78,
    price: 6574,
  },
  {
    name: "Product 2",
    sku: "SKU-YYYYYY",
    stock: 50,
    price: 3500,
  },
  {
    name: "Product 3",
    sku: "SKU-ZZZZZZ",
    stock: 120,
    price: 7800,
  },
];