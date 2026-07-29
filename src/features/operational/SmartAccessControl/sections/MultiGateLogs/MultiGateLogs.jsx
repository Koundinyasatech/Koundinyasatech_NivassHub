import { useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Select from "../../../../../components/Common/Select/Select";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import MultiGateLogTable from "./components/MultiGateLogTable";

import multiGateLogColumns from "./constants/multiGateLogColumns";
import multiGateLogData from "./data/multiGateLogData";

function MultiGateLog() {
  const [search, setSearch] = useState("");
  const [gate, setGate] = useState("All");

  const gateOptions = [
    { label: "All Gates", value: "All" },
    { label: "Main Gate", value: "Main Gate" },
    { label: "Rear Gate", value: "Rear Gate" },
    { label: "Pedestrian Gate", value: "Pedestrian Gate" },
  ];

  const filteredData = multiGateLogData.filter((item) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      item.who.toLowerCase().includes(searchText);

    const matchGate =
      gate === "All" ||
      item.gate === gate;

    return matchSearch && matchGate;
  });

  return (
    <Card>
      {/* Search + Filter + Records */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
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
            value={gate}
            options={gateOptions}
            onChange={(e) =>
              setGate(e.target.value)
            }
          />
        </div>

        <span>
          {filteredData.length} Records
        </span>
      </div>

      <MultiGateLogTable
        columns={multiGateLogColumns}
        data={filteredData}
      />

      <Pagination
        currentPage={1}
        totalPages={1}
        totalRecords={filteredData.length}
        pageSize={10}
        onPageChange={() => {}}
      />
    </Card>
  );
}

export default MultiGateLog;