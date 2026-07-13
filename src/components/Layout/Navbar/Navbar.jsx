import "./Navbar.css";
import RoleDropdown from "./RoleDropdown";
import { FiSearch } from "react-icons/fi";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <span>Nivaas</span>Hub
      </div>

      <div className="search">
        <FiSearch />

        <input
          type="text"
          placeholder="Search modules... (e.g. KYC, parking, GST)"
        />
      </div>

      <RoleDropdown />
    </header>
  );
}

export default Navbar;