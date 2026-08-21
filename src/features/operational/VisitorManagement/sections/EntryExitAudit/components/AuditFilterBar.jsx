import { FiSearch } from "react-icons/fi";

function AuditFilterBar({
  searchText,
  onSearchChange,
  methodFilter,
  onMethodChange,
  totalRecords,
}) {
  return (
    <div className="audit-filter-bar">

      {/* Search Box */}

      <div className="audit-search-box">
        <FiSearch className="audit-search-icon" />

        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      {/* Method Filter */}

      <select
        className="audit-method-dropdown"
        value={methodFilter}
        onChange={(e) =>
          onMethodChange(e.target.value)
        }
      >
        <option value="All">All Methods</option>
        <option value="Pre-approved">Pre-approved</option>
        <option value="Whitelisted">Whitelisted</option>
        <option value="OTP Call">OTP Call</option>
      </select>

      {/* Record Count */}

      <div className="audit-record-count">
        {totalRecords} records
      </div>

    </div>
  );
}

export default AuditFilterBar;