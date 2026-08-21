import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* =========================
   Authentication
========================= */
import Login from "../pages/Login/Login";
import PhoneLogin from "../pages/Login/PhoneLogin";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import VerifyOTP from "../pages/ForgotPassword/VerifyOTP";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";

/* =========================
   Profile
========================= */
import Profile from "../pages/Profile/Profile";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";

/* =========================
   Foundation
========================= */
import SocietyUnits from "../features/Foundation/SocietyUnits/pages/SocietyUnits";
import ResidentsUsers from "../features/Foundation/ResidentsUsers/pages/ResidentsUsers";
import GuardsStaff from "../features/Foundation/GuardsStaff/Pages/GuardsStaff";

/* =========================
   Operational
========================= */
import VisitorManagement from "../features/Operational/VisitorManagement/Pages/VisitorManagement";
import PackageDelivery from "../features/Operational/PackageDelivery/Pages/PackageDelivery";
import ParkingManagement from "../features/Operational/ParkingManagement/Pages/ParkingManagement";
import SmartAccessControl from "../features/Operational/SmartAccessControl/Pages/SmartAccessControl";

/* =========================
   Community
========================= */
import AmenityBooking from "../features/community/AmenityBooking/Pages/AmenityBooking";
import NoticesCommunication from "../features/community/NoticesCommunication/Pages/NoticesCommunication";
import PollsVoting from "../features/community/PollsVoting/Pages/PollsVoting";
import SocietyDocuments from "../features/community/SocietyDocuments/Pages/SocietyDocuments";

/* =========================
   System / Platform
========================= */
import SocietyOnboardingReview from "../features/system/SocietyOnboardingReview/Pages/SocietyOnboardingReview";
import IntegrationsAPIs from "../features/system/IntegrationsAPIs/Pages/IntegrationsAPIs";
import RolesPermissions from "../features/system/RolesPermissions/Pages/RolesPermissions";
import AuditSystemLogs from "../features/system/AuditSystemLogs/Pages/AuditSystemLogs";
import BillingPlans from "../features/system/BillingPlans/Pages/BillingPlans";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================================
            AUTHENTICATION ROUTES
        ===================================================== */}

        {/* Email Login */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Mobile Login */}
        <Route
          path="/login/phone"
          element={<PhoneLogin />}
        />

        {/* Forgot Password - Step 1 */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Forgot Password - Step 2 */}
        <Route
          path="/forgot-password/verify-otp"
          element={<VerifyOTP />}
        />

        {/* Forgot Password - Step 3 */}
        <Route
          path="/forgot-password/reset-password"
          element={<ResetPassword />}
        />


        {/* =====================================================
            PROTECTED ADMIN ROUTES
        ===================================================== */}

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          {/* =================================================
              PROFILE
          ================================================= */}

          <Route
            path="/profile"
            element={<Profile />}
          />


          {/* =================================================
              FOUNDATION
          ================================================= */}

          <Route
            path="/foundation"
            element={
              <Navigate
                to="/foundation/society"
                replace
              />
            }
          />

          <Route
            path="/foundation/society"
            element={<SocietyUnits />}
          />

          <Route
            path="/foundation/residents"
            element={<ResidentsUsers />}
          />

          <Route
            path="/foundation/guards"
            element={<GuardsStaff />}
          />


          {/* =================================================
              OPERATIONAL
          ================================================= */}

          <Route
            path="/operational"
            element={
              <Navigate
                to="/operational/visitor-management"
                replace
              />
            }
          />

          <Route
            path="/operational/visitor-management"
            element={<VisitorManagement />}
          />

          <Route
            path="/operational/package-delivery"
            element={<PackageDelivery />}
          />

          <Route
            path="/operational/parking-management"
            element={<ParkingManagement />}
          />

          <Route
            path="/operational/smart-access-control"
            element={<SmartAccessControl />}
          />


          {/* =================================================
              COMMUNITY
          ================================================= */}

          <Route
            path="/community"
            element={
              <Navigate
                to="/community/amenity-booking"
                replace
              />
            }
          />

          <Route
            path="/community/amenity-booking"
            element={<AmenityBooking />}
          />

          <Route
            path="/community/notices-communication"
            element={<NoticesCommunication />}
          />

          <Route
            path="/community/polls-voting"
            element={<PollsVoting />}
          />

          <Route
            path="/community/society-documents"
            element={<SocietyDocuments />}
          />
          
          {/* =================================================
              SYSTEM / PLATFORM
          ================================================= */}

          <Route
            path="/system-platform"
            element={
              <Navigate
                to="/system-platform/society-onboarding-review"
                replace
              />
            }
          />

          <Route
            path="/system-platform/society-onboarding-review"
            element={<SocietyOnboardingReview />}
          />

          <Route
            path="/system-platform/integrations-apis"
            element={<IntegrationsAPIs />}
          />

          <Route
            path="/system-platform/roles-permissions"
            element={<RolesPermissions />}
          />

          <Route
            path="/system-platform/audit-system-logs"
            element={<AuditSystemLogs />}
          />

          <Route
            path="/system-platform/billing-plans"
            element={<BillingPlans />}
          />

      
        </Route>

        

        {/* =====================================================
            FALLBACK
        ===================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


/* =====================================================
   DEFAULT EXPORT
===================================================== */

export default AppRoutes;