import "./RoleDropdown.css";

function RoleDropdown() {
  return (
    <div className="role-area">
      <span>Viewing as</span>

      <select>
        <option>Super Admin</option>
        <option>Admin</option>
      </select>

      <div className="avatar">SA</div>
    </div>
  );
}

export default RoleDropdown;