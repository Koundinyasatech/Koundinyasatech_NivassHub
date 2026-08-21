import "./Navbar.css";

import {
  FiSearch,
} from "react-icons/fi";

import UserMenu from "./UserMenu";


function Navbar() {

  return (

    <header className="navbar">

      {/* LOGO */}

      <div className="logo">

        <span>
          Nivaas
        </span>

        Hub

      </div>


      {/* SEARCH */}

      <div className="search">

        <FiSearch />

        <input
          type="text"
          placeholder="Search modules... (e.g. KYC, parking, GST)"
        />

      </div>


      {/* USER MENU */}

      <UserMenu />

    </header>

  );
}


export default Navbar;