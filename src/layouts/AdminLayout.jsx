import "./AdminLayout.css";

import { Outlet } from "react-router-dom";

import Navbar from "../components/Layout/Navbar/Navbar";
import Sidebar from "../components/Layout/Sidebar/Sidebar";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Navbar />

      <div className="layout-body">
        <Sidebar />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;