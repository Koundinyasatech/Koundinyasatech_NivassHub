import { FiSearch, FiPlus } from "react-icons/fi";

function WhitelistFilterBar({
  searchText,
  onSearchChange,
  totalRecords,
  onAddEntry,
}) {
  return (
    <div className="whitelist-filter-container">

      <div className="whitelist-search-box">
        <FiSearch className="whitelist-search-icon" />

        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      <div className="whitelist-right-section">

        <span className="whitelist-record-count">
          {totalRecords} records
        </span>

        <button
          className="whitelist-add-btn"
          onClick={onAddEntry}
        >
          <FiPlus />
          Add Entry
        </button>

      </div>

    </div>
  );
}

export default WhitelistFilterBar;