import { useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Select from "../../../../../components/Common/Select/Select";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import ConfirmDialog from "../../../../../components/Common/ConfirmDialog/ConfirmDialog";

import FaceRecognitionTable from "./components/FaceRecognitionTable";

import faceRecognitionColumns from "./constants/faceRecognitionColumns";
import faceRecognitionData from "./data/faceRecognitionData";

function FaceRecognitionEnrollment() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // Table Data
  const [tableData, setTableData] = useState(faceRecognitionData);

  // Confirm Dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);

  const statusOptions = [
    { label: "All Statuses", value: "All" },
    { label: "Approved", value: "Approved" },
    { label: "Pending", value: "Pending" },
  ];

  const filteredData = tableData.filter((item) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      item.resident.toLowerCase().includes(searchText) ||
      item.unit.toLowerCase().includes(searchText);

    const matchStatus =
      status === "All" || item.status === status;

    return matchSearch && matchStatus;
  });

  const handleApprove = (row) => {
    console.log("Approve", row);
  };

  // Remove Button Click
  const handleRemove = (row) => {
    setSelectedResident(row);
    setConfirmOpen(true);
  };

  // Confirm Remove
  const confirmDelete = () => {
    setTableData((prev) =>
      prev.filter(
        (item) =>
          item.resident !== selectedResident.resident
      )
    );

    setConfirmOpen(false);
    setSelectedResident(null);
  };

  // Cancel Remove
  const cancelDelete = () => {
    setConfirmOpen(false);
    setSelectedResident(null);
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

        <FaceRecognitionTable
          columns={faceRecognitionColumns}
          data={filteredData}
          onApprove={handleApprove}
          onRemove={handleRemove}
        />

        <Pagination
          currentPage={1}
          totalPages={1}
          totalRecords={filteredData.length}
          pageSize={10}
          onPageChange={() => {}}
        />
      </Card>

      {/* Confirm Delete Dialog */}

      <ConfirmDialog
        open={confirmOpen}
        title="Remove Face Enrollment"
        message={`Are you sure you want to remove ${selectedResident?.resident}?`}
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

export default FaceRecognitionEnrollment;