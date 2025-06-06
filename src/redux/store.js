import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import passwordReducer from "./auth/passwordSlice";
import loginReducer from "./auth/loginSlice";
import purchaseIndentReducer from "./purchase/purchaseIndent";
import purchaseOrderReducer from "./purchase/purchaseOrder";
import vendorReducer from "./Vendor/VendorSlice";
import vendorLogin from "./Vendor/loginSlice";
import vendorInventoryReducer from "./Vendor/InventorySlice";
import vendorInventoryImageReducer from "./Vendor/InventoryImageSlice";
import userReducer from "./auth/userSlice";
import vendorPurchaseRequest from "./Vendor/VendorPurchaseRequest";


const rootReducer = combineReducers({
  auth: authReducer,
  password: passwordReducer,
  login: loginReducer,
  purchaseIndent: purchaseIndentReducer,
  purchaseOrder: purchaseOrderReducer,
  vendorReducer: vendorReducer,
  vendorData: vendorLogin,
  vendorInventoryImageReducer: vendorInventoryImageReducer,
  vendorInventoryReducer: vendorInventoryReducer,
  user: userReducer,
  vendorRequest: vendorPurchaseRequest
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
