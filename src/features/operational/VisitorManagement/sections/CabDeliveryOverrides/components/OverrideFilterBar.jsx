import { FiSearch } from "react-icons/fi";

function OverrideFilterBar({
  searchText,
  onSearchChange,
  totalRecords,
}) {
  return (
    <div className="override-filter-bar">

      <div className="override-search-box">
        <FiSearch className="override-search-icon" />

        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      <div className="override-record-count">
        {totalRecords} records
      </div>

    </div>
  );
}

export default OverrideFilterBar;