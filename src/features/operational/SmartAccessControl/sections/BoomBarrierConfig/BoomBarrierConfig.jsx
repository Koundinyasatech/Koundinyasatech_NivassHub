import { useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import BoomBarrierTable from "./components/BoomBarrierTable";
import EditBarrierModal from "./components/EditBarrierModal";

import boomBarrierColumns from "./constants/boomBarrierColumns";
import boomBarrierData from "./data/boomBarrierData";

function BoomBarrierConfig({
  isAddBarrierOpen,
  onCloseAddBarrier,
}) {
  const [search, setSearch] = useState("");

  // Table Data
  const [tableData, setTableData] =
    useState(boomBarrierData);

  // Edit Modal
  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [selectedBarrier, setSelectedBarrier] =
    useState(null);

  // Search
  const filteredData = tableData.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.barrier
        .toLowerCase()
        .includes(searchText) ||
      item.gate
        .toLowerCase()
        .includes(searchText) ||
      item.deviceId
        .toLowerCase()
        .includes(searchText)
    );
  });

  // ===========================
  // Edit
  // ===========================

  const handleEdit = (row) => {
    setSelectedBarrier(row);
    setIsEditOpen(true);
  };

  const handleClose = () => {
    setIsEditOpen(false);
    setSelectedBarrier(null);
  };

  // ===========================
  // Save Edit
  // ===========================

  const handleUpdateBarrier = (
    updatedBarrier
  ) => {
    setTableData((prev) =>
      prev.map((item) =>
        item.id === selectedBarrier.id
          ? {
              ...item,
              ...updatedBarrier,
            }
          : item
      )
    );

    handleClose();
  };

  // ===========================
  // Save Add
  // ===========================

  const handleAddBarrier = (
    newBarrier
  ) => {
    setTableData((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newBarrier,
        connection: "Online",
      },
    ]);

    onCloseAddBarrier();
  };

  const handleTestConnection = (
    row
  ) => {
    console.log(row);
  };

  return (
    <>
      <Card>
        {/* Search + Records */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <SearchBar
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <span>
            {filteredData.length} Records
          </span>
        </div>

        <BoomBarrierTable
          columns={boomBarrierColumns}
          data={filteredData}
          onEdit={handleEdit}
          onTestConnection={
            handleTestConnection
          }
        />

        <Pagination
          currentPage={1}
          totalPages={1}
        />
      </Card>

      {/* Edit */}

      <EditBarrierModal
        open={isEditOpen}
        data={selectedBarrier}
        onClose={handleClose}
        onSave={handleUpdateBarrier}
        mode="edit"
      />

      {/* Add */}

      <EditBarrierModal
        open={isAddBarrierOpen}
        data={null}
        onClose={onCloseAddBarrier}
        onSave={handleAddBarrier}
        mode="add"
      />
    </>
  );
}

export default BoomBarrierConfig;