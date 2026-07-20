import { useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Select from "../../../../../components/Common/Select/Select";
import Table from "../../../../../components/Common/Table/Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import columns from "./constants/auditColumns";
import auditData from "./data/auditData";

function EntryExitAudit() {
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("All");

  const filteredData = auditData.filter((item) => {
    const matchesSearch =
      item.visitor.toLowerCase().includes(search.toLowerCase()) ||
      item.flat.toLowerCase().includes(search.toLowerCase()) ||
      item.guard.toLowerCase().includes(search.toLowerCase());

    const matchesMethod =
      method === "All" || item.method === method;

    return matchesSearch && matchesMethod;
  });

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <SearchBar
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <Select
            value={method}
            onChange={setMethod}
            options={[
              {
                label: "All methods",
                value: "All",
              },
              {
                label: "Pre-approved",
                value: "Pre-approved",
              },
              {
                label: "Whitelisted",
                value: "Whitelisted",
              },
              {
                label: "OTP Call",
                value: "OTP Call",
              },
            ]}
          />
        </div>

        <span
          style={{
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          {filteredData.length} records
        </span>
      </div>

      <Table
        columns={columns}
        data={filteredData}
      />

      <Pagination
        currentPage={1}
        totalPages={1}
      />
    </Card>
  );
}

export default EntryExitAudit;