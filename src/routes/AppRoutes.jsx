import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login/Login";
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

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* =========================
              Foundation
          ========================= */}

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

          {/* =========================
              Operational
          ========================= */}

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

          {/* =========================
              Community
          ========================= */}

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;