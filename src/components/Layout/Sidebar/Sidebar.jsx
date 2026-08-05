import "./Sidebar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

import { sidebarData } from "./sidebarData";

function Sidebar() {
  const [openMenu, setOpenMenu] =
    useState("Foundation");

  const toggleMenu = (title) => {
    setOpenMenu((prev) =>
      prev === title ? "" : title
    );
  };

  return (
    <aside className="sidebar">
      {sidebarData.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="sidebar-section"
          >
            <div
              className="menu-item"
              onClick={() =>
                toggleMenu(item.title)
              }
            >
              <div className="menu-left">
                <span
                  className="menu-icon"
                  style={{
                    color: item.color,
                  }}
                >
                  <Icon />
                </span>

                <span>{item.title}</span>
              </div>

              {item.children.length >
                0 &&
                (openMenu ===
                item.title ? (
                  <FiChevronDown />
                ) : (
                  <FiChevronRight />
                ))}
            </div>

            {openMenu ===
              item.title &&
              item.children.length >
                0 && (
                <div className="submenu">
                  {item.children.map(
                    (child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({
                          isActive,
                        }) =>
                          isActive
                            ? "submenu-item active"
                            : "submenu-item"
                        }
                      >
                        {child.title}
                      </NavLink>
                    )
                  )}
                </div>
              )}
          </div>
        );
      })}
    </aside>
  );
}

export default Sidebar;