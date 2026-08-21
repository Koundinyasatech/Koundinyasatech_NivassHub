import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../../features/auth/authSlice";

import "./UserMenu.css";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
   * Get logged-in user from Redux
   */
  const user = useSelector(
    (state) => state.auth?.user
  );

  /*
   * Get authentication state
   */
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated
  );

  /*
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * User ID
   */
  const userId =
    user?.UserId ||
    user?.userId ||
    user?.id ||
    "";

  /*
   * Role
   */
  const roleName =
    user?.Role_Name ||
    user?.roleName ||
    user?.role ||
    "";

  /*
   * Display role
   */
  const getDisplayRole = () => {
    switch (roleName) {
      case "SA":
        return "Super Admin";

      case "ADMIN":
        return "Admin";

      case "SUB_ADMIN":
        return "Sub Admin";

      default:
        return roleName || "Administrator";
    }
  };

  /*
   * Avatar
   */
  const getAvatarText = () => {
    if (roleName === "SA") {
      return "SA";
    }

    if (roleName) {
      return roleName
        .replace(/[^a-zA-Z]/g, "")
        .substring(0, 2)
        .toUpperCase();
    }

    return "AD";
  };

  /*
   * Profile
   */
  const handleProfile = () => {
    setIsOpen(false);

    navigate("/profile");
  };

  /*
   * Settings
   */
  const handleSettings = () => {
    setIsOpen(false);

    navigate("/settings");
  };

  /*
   * Logout
   *
   * Logout API is not available yet.
   *
   * For now:
   * - Clear Redux authentication
   * - Redirect to Login
   */
  const handleLogout = () => {
    console.log(
      "Logout API not available yet. Logging out locally."
    );

    dispatch(logout());

    setIsOpen(false);

    navigate("/");
  };

  /*
   * Don't display menu when logged out
   */
  if (!isAuthenticated && !user) {
    return null;
  }

  return (
    <div
      className="user-menu-container"
      ref={menuRef}
    >
      {/* =========================================
          USER BUTTON
      ========================================= */}

      <button
        type="button"
        className="user-menu-trigger"
        onClick={() =>
          setIsOpen((previous) => !previous)
        }
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {/* Avatar */}

        <div className="user-avatar">
          {getAvatarText()}
        </div>

        {/* User information */}

        <div className="user-info">
          <span className="user-name">
            {userId || "Administrator"}
          </span>

          <span className="user-role">
            {getDisplayRole()}
          </span>
        </div>

        {/* Arrow */}

        <span
          className={`user-menu-arrow ${
            isOpen ? "open" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* =========================================
          DROPDOWN
      ========================================= */}

      {isOpen && (
        <div
          className="user-dropdown"
          role="menu"
        >
          {/* User Header */}

          <div className="dropdown-user-header">
            <div className="dropdown-avatar">
              {getAvatarText()}
            </div>

            <div className="dropdown-user-info">
              <h4>
                {userId || "Administrator"}
              </h4>

              <p>
                {getDisplayRole()}
              </p>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          {/* Profile */}

          <button
            type="button"
            className="dropdown-item"
            onClick={handleProfile}
            role="menuitem"
          >
            <span className="dropdown-icon">
              👤
            </span>

            <span>
              Profile
            </span>
          </button>

          {/* Settings */}

          <button
            type="button"
            className="dropdown-item"
            onClick={handleSettings}
            role="menuitem"
          >
            <span className="dropdown-icon">
              ⚙
            </span>

            <span>
              Settings
            </span>
          </button>

          <div className="dropdown-divider"></div>

          {/* Logout */}

          <button
            type="button"
            className="dropdown-item logout-item"
            onClick={handleLogout}
            role="menuitem"
          >
            <span className="dropdown-icon">
              ⇥
            </span>

            <span>
              Logout
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;