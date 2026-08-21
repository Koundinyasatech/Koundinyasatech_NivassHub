import { useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Table from "../../../../../components/Common/Table/Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import columns from "./constants/whitelistColumns";
import whitelistData from "./data/whitelistData";

function FrequentVisitorWhitelist() {

  const [search, setSearch] = useState("");

  const filteredData = whitelistData.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Card>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <SearchBar
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search..."
        />

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

export default FrequentVisitorWhitelist;