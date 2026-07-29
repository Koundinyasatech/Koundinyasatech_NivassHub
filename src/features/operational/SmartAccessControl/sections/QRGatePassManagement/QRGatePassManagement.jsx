import { useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import Select from "../../../../../components/Common/Select/Select";

import QRGatePassTable from "./components/QRGatePassTable";

import qrGatePassColumns from "./constants/qrGatePassColumns";
import qrGatePassData from "./data/qrGatePassData";
import statusOptions from "./constants/statusOptions";

function QRGatePassManagement() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [, setSelectedRow] = useState(null);

  // Added: Store data in state
  const [gatePassData, setGatePassData] = useState(qrGatePassData);

  const filteredData = gatePassData.filter((item) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      item.pass.toLowerCase().includes(searchText) ||
      item.recipient.toLowerCase().includes(searchText);

    const matchStatus =
      status === "All" || item.status === status;

    return matchSearch && matchStatus;
  });

  const handleExtend = (row) => {
    setSelectedRow(row);
  };

  const handleView = (row) => {
    setSelectedRow(row);
  };

  // Added: Revoke Function
  const handleRevoke = (row) => {
    const updatedData = gatePassData.map((item) =>
      item.pass === row.pass
        ? {
            ...item,
            status: "Revoked",
            action: "View",
          }
        : item
    );

    setGatePassData(updatedData);
  };

  return (
    <>
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
              value={status}
              options={statusOptions}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            />
          </div>

          <span>
            {filteredData.length} Records
          </span>
        </div>

        <QRGatePassTable
          columns={qrGatePassColumns}
          data={filteredData}
          onExtend={handleExtend}
          onView={handleView}
          onRevoke={handleRevoke}
        />

        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </Card>
    </>
  );
}

export default QRGatePassManagement;