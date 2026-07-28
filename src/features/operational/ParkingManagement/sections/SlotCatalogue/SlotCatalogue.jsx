import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Select from "../../../../../components/Common/Select/Select";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import SlotCatalogueTable from "./components/SlotCatalogueTable";
import SlotModal from "./components/SlotModal";

import { slotDummyData } from "./data/slotDummyData";

function SlotCatalogue({
  openModal,
  setOpenModal,
  selectedSlot,
  setSelectedSlot,
}) {
  // =========================================
  // State
  // =========================================

  const [search, setSearch] = useState("");

  const [level, setLevel] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [slots, setSlots] = useState(slotDummyData);

  const pageSize = 7;

  // =========================================
  // Filter
  // =========================================

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return slots.filter((item) => {
      const matchesSearch =
        item.slotNumber.toLowerCase().includes(keyword);

      const matchesLevel =
        !level || item.level === level;

      const matchesStatus =
        !status || item.status === status;

      return (
        matchesSearch &&
        matchesLevel &&
        matchesStatus
      );
    });
  }, [slots, search, level, status]);

  // =========================================
  // Pagination
  // =========================================

  const totalPages = Math.ceil(
    filteredData.length / pageSize
  );

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredData.slice(
      start,
      start + pageSize
    );
  }, [filteredData, page]);

  // =========================================
  // Actions
  // =========================================

  const handleAdd = () => {
    setSelectedSlot(null);
    setOpenModal(true);
  };

  const handleEdit = (slot) => {
    setSelectedSlot(slot);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedSlot(null);
  };

  const handleSave = (data) => {
  if (selectedSlot) {
    setSlots((prev) =>
      prev.map((item) =>
        item.id === data.id
          ? data
          : item
      )
    );
  } else {
    setSlots((prev) => [
      ...prev,
      {
        ...data,
        id: Date.now(),
      },
    ]);
  }
};

  // =========================================
  // Render
  // =========================================

  return (
    <>
      <Card>
        <div className="tower-toolbar">
          <div className="tower-search">
            <Input
              placeholder="Search Slot..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <Select
            value={level}
           onChange={(value) => setLevel(value)}
            options={[
              { label: "All Levels", value: "" },
              {
                label: "Basement 1",
                value: "Basement 1",
              },
              {
                label: "Basement 2",
                value: "Basement 2",
              },
            ]}
          />

          <Select
            value={status}
            onChange={(value) => setStatus(value)}
            options={[
              { label: "All Status", value: "" },
              { label: "Free", value: "Free" },
              {
                label: "Allocated",
                value: "Allocated",
              },
              {
                label: "Occupied",
                value: "Occupied",
              },
            ]}
          />

          <div className="record-count">
            7 Records
          </div>
        </div>

        <SlotCatalogueTable
          data={paginatedData}
          onEdit={handleEdit}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalRecords={filteredData.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </Card>

      <SlotModal
        open={openModal}
        slot={selectedSlot}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
}

export default SlotCatalogue;