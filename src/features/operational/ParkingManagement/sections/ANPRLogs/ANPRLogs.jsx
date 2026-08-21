import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Select from "../../../../../components/Common/Select/Select";
import Table from "../../../../../components/Common/Table/Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import StatusBadge from "../../../../../components/Common/StatusBadge/StatusBadge";

import { anprDummyData } from "./data/anprDummyData";
import { anprColumns } from "./constants/anprColumns";

function ANPRLog() {
  const [search, setSearch] = useState("");
  const [gateFilter, setGateFilter] = useState("All gates");

  const filteredData = useMemo(() => {
    return anprDummyData.filter((item) => {
      const matchesSearch =
        item.plate
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.gate
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesGate =
        gateFilter === "All gates" ||
        item.gate === gateFilter;

      return matchesSearch && matchesGate;
    });
  }, [search, gateFilter]);

  const tableData = filteredData.map((item) => ({
    id: item.id,
    plate: item.plate,
    gate: item.gate,

    direction: (
      <StatusBadge
        variant={
          item.direction === "IN"
            ? "success"
            : "secondary"
        }
      >
        {item.direction}
      </StatusBadge>
    ),

    time: item.time,

    registryMatch: (
      <StatusBadge
        variant={
          item.registryMatch === "Matched"
            ? "success"
            : "danger"
        }
      >
        {item.registryMatch}
      </StatusBadge>
    ),
  }));

  return (
    <Card>
      <div className="toolbar">
        <div className="toolbar-left">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

         <Select
  value={gateFilter}
  onChange={setGateFilter}
  options={[
    {
      label: "All gates",
      value: "All gates",
    },
    {
      label: "Main Gate",
      value: "Main Gate",
    },
    {
      label: "Rear Gate",
      value: "Rear Gate",
    },
  ]}
/>
        </div>

        <div className="record-count">
          {filteredData.length} records
        </div>
      </div>

      <Table
        columns={anprColumns}
        data={tableData}
      />

      <Pagination
        currentPage={1}
        totalPages={1}
        totalRecords={filteredData.length}
        pageSize={filteredData.length}
        onPageChange={() => {}}
      />
    </Card>
  );
}

export default ANPRLog;