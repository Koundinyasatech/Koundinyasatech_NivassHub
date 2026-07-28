import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import SlotAllocationTable from "./components/SlotAllocationTable";
import SlotAllocationModal from "./components/SlotAllocationModal";

import { slotAllocationDummyData } from "./data/slotAllocationDummyData";

function SlotAllocation() {
  // =========================================
  // State
  // =========================================

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [selectedAllocation, setSelectedAllocation] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  const [allocations, setAllocations] =
    useState(slotAllocationDummyData);

  const pageSize = 10;

  // =========================================
  // Filter
  // =========================================

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return allocations.filter((item) => {
      return [
        item.unit,
        item.slot,
        item.type,
        item.allocatedOn,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });
  }, [allocations, search]);

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

  const handleAllocate = (item) => {
    setSelectedAllocation(item);
    setOpenModal(true);
  };

  const handleClose = () => {
    setSelectedAllocation(null);
    setOpenModal(false);
  };

  const handleSave = (data) => {
    setAllocations((prev) =>
      prev.map((item) =>
        item.id === data.id ? data : item
      )
    );
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
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="record-count">
            {filteredData.length} Records
          </div>
        </div>

        <SlotAllocationTable
          data={paginatedData}
          onAllocate={handleAllocate}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalRecords={filteredData.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </Card>

      <SlotAllocationModal
        open={openModal}
        allocation={selectedAllocation}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
}

export default SlotAllocation;