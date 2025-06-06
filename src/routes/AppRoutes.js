import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "../features/home/HomePage/HomePage";
import Login from "../features/user/Auth/Login";
import Signup from "../features/user/Auth/Signup";
import UpdatePassword from "../features/user/Auth/UpdatePassword";
import InVerifyEmail from "../features/user/Auth/verifyEmail";
import Authentication from "../features/user/Accounts/Authentication";
import Main from "../features/home/HomePage/Mainbar";
import DashboardHeader from "../features/home/Header/DashboardHeader";
import PurchaseIndent from "../features/purchase/PurchaseIndent/PurchaseIndent";
import PurchaseOrder from "../features/purchase/PurchaseOrder/PurchaseOrder";
import ProtectedRoute from "./ProtectedRoute";
import VendorRegistration from "../features/VendorSignUp/VendorRegistration";
import VerifyVendorEmail from "../features/VendorSignUp/VerifyVendorEmail";
import VendorMain from "../features/Vendor/VendorDashboard/VendorMain";
import VendorDashboard from "../features/Vendor/VendorDashboard/VendorDashboard";
import VendorRFQ from "../features/Vendor/QuoteManagement/VendorRFQ/VendorRFQ";
import VendorQuotation from "../features/Vendor/QuoteManagement/VendorQuotation/VendorQuotation";
import Inventory from "../features/Vendor/Inventory/Inventory";
import QuoteRequest from "../features/purchase/QuoteRequest/QuoteRequest";
import VendorReRFQ from "../features/Vendor/QuoteManagement/VendorReRFQ/VendorReRFQ";
import QuoteHistory from "../features/Vendor/QuoteManagement/QuoteHistory/QuoteHistory";
import VendorHeader from "../features/home/Header/VendorHeader";
import Dashboard from "../features/Dashboard/Dashboard";
import ReceivingQC from "../features/purchase/ReceivingQC/ReceivingQC";
import GRN from "../features/purchase/GRN/GRN";
import Put from "../features/purchase/Put/Put";
import DebitNote from "../features/purchase/DebitNote/DebitNote";

const AppRoutes = () => {
  const location = useLocation();

  const publicPaths = ["/", "/login", "/signup", "/user/updatePassword", "/admin/authentication", "/vendor-register"];
  const hideHeader = publicPaths.includes(location.pathname);
  const isVendorRoute = location.pathname.startsWith("/vendor")

  return (
    <>
      {!hideHeader && (
        isVendorRoute ? <VendorHeader /> : <DashboardHeader />
      )}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/updatePassword" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<InVerifyEmail />} />
        <Route path="/verify-vendor-email" element={<VerifyVendorEmail />} />
        <Route path="/admin/authentication" element={<Authentication />} />
        <Route path="/vendor-register" element={<VendorRegistration />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Main />}>
        <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Protected Purchase Route */}
          <Route
            path="purchase-indent"
            element={
              <ProtectedRoute>
                <PurchaseIndent />
              </ProtectedRoute>
            }
          />
          <Route
            path="quote-request"
            element={
              <ProtectedRoute>
                <QuoteRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="purchase-order"
            element={
              <ProtectedRoute>
                <PurchaseOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="receiving-qc"
            element={
              <ProtectedRoute>
                <ReceivingQC />
              </ProtectedRoute>
            }
          />
          <Route
            path="grn"
            element={
              <ProtectedRoute>
                <GRN />
              </ProtectedRoute>
            }
          />
          <Route
            path="debit-note"
            element={
              <ProtectedRoute>
                <Put />
              </ProtectedRoute>
            }
          />
          <Route
            path="put"
            element={
              <ProtectedRoute>
                <DebitNote />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Vendor Route */}
        <Route path="/vendor" element={<VendorMain />}>
          <Route index element={<Navigate to="vendor-dashboard" />} />
          <Route
            path="vendor-dashboard"
            element={
              <ProtectedRoute>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="rfq"
            element={
              <ProtectedRoute>
                <VendorRFQ />
              </ProtectedRoute>
            }
          />
          <Route
            path="quotation"
            element={
              <ProtectedRoute>
                <VendorQuotation />
              </ProtectedRoute>
            }
          />
          <Route
            path="re-rfq"
            element={
              <ProtectedRoute>
                <VendorReRFQ />
              </ProtectedRoute>
            }
          />
          <Route
            path="quote-history"
            element={
              <ProtectedRoute>
                <QuoteHistory/>
              </ProtectedRoute>
            }
          />
          <Route
            path="inventory-management"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
