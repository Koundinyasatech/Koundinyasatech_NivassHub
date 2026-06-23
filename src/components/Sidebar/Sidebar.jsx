import "./Sidebar.css";
import { sidebarData } from "./sidebarData";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>
          Nivass<span>Hub</span>
        </h2>
      </div>

      <nav className="sidebar-menu">
        {sidebarData.map((item) => (
          <div key={item.title} className="menu-item">
            {item.title}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;