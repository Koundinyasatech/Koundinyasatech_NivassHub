import { useState } from "react";

import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Select from "../../../../../components/Common/Select/Select";
import Table from "../../../../../components/Common/Table/Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import flaggedColumns from "./constants/flaggedColumns";
import flaggedEntriesData from "./data/flaggedEntriesData";

function FlaggedEntries() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredData = flaggedEntriesData.filter((item) => {
    const matchesSearch = item.visitor
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || item.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {/* Search + Status Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <SearchBar
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: "All", label: "All Statuses" },
              { value: "Open", label: "Open" },
              { value: "Resolved", label: "Resolved" },
            ]}
          />
        </div>

        <span
          style={{
            color: "#6B7280",
            fontSize: "14px",
          }}
        >
          {filteredData.length} records
        </span>
      </div>

      <Table
        columns={flaggedColumns}
        data={filteredData}
      />

      <Pagination
        currentPage={1}
        totalPages={1}
      />
    </>
  );
}

export default FlaggedEntries;