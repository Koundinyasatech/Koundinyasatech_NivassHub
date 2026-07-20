import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import CourierWhitelistTable from "./components/CourierWhitelistTable";
import CourierWhitelistModal from "./components/CourierWhitelistModal";

import { courierDummyData } from "./data/courierDummyData";

function CourierWhitelist({
  openModal,
  setOpenModal,
  selectedCourier,
  setSelectedCourier,
}) {
  // =========================================
  // State
  // =========================================

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [couriers, setCouriers] =
    useState(courierDummyData);

  const pageSize = 10;

  // =========================================
  // Filter
  // =========================================

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return couriers.filter((item) => {
      return (
        item.courier
          .toLowerCase()
          .includes(keyword) ||
        item.skipCall
          .toLowerCase()
          .includes(keyword) ||
        item.notes
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [couriers, search]);

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

  const handleEdit = (courier) => {
    setSelectedCourier(courier);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedCourier(null);
  };

  const handleSave = (data) => {
    if (selectedCourier) {
      setCouriers((prev) =>
        prev.map((item) =>
          item.id === data.id
            ? data
            : item
        )
      );
    } else {
      setCouriers((prev) => [
        ...prev,
        {
          ...data,
          id: Date.now(),
        },
      ]);
    }

    handleClose();
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

        <CourierWhitelistTable
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

      <CourierWhitelistModal
        open={openModal}
        courier={selectedCourier}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
}

export default CourierWhitelist;