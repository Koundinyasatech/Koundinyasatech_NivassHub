import { useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Table from "../../../../../components/Common/Table/Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import overrideColumns from "./constants/overrideColumns";
import overrideData from "./data/overrideData";

function CabDeliveryOverrides() {
  const [search, setSearch] = useState("");

  const filteredData =overrideData.filter((item) =>
    item.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          width="230px"
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
        columns={overrideColumns}
        data={filteredData}
      />

      <Pagination
        currentPage={1}
        totalPages={1}
      />
    </Card>
  );
}

export default CabDeliveryOverrides;