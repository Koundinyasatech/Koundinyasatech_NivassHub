import { FiSearch } from "react-icons/fi";

function FilterBar({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  totalRecords,
}) {
  return (
    <div className="preapproval-filter-bar">
      <div className="preapproval-search-box">
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        className="status-dropdown"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Expired">Expired</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <div className="record-count">
        {totalRecords} Records
      </div>
    </div>
  );
}

export default FilterBar;