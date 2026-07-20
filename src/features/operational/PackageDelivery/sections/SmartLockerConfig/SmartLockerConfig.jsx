import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";

import Pagination from "../../../../../components/Common/Pagination/Pagination";

import SmartLockerTable from "./components/SmartLockerTable";
import SmartLockerModal from "./components/SmartLockerModal";

import { lockerDummyData } from "./data/lockerDummyData";

function SmartLockerConfig({
  openModal,
  setOpenModal,
  selectedLocker,
  setSelectedLocker,
})  {
  // =========================================
  // State
  // =========================================

 const [search, setSearch] = useState("");

const [page, setPage] = useState(1);

const [lockers, setLockers] =
  useState(lockerDummyData);

 

  const pageSize = 10;

  // =========================================
  // Filter
  // =========================================

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return lockers.filter((item) =>  {
      return (
        item.lockerBank
          .toLowerCase()
          .includes(keyword) ||
        item.status
          .toLowerCase()
          .includes(keyword)
      );
    });
   }, [lockers, search]);

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
    setSelectedLocker(null);
    setOpenModal(true);
  };

  const handleEdit = (locker) => {
    setSelectedLocker(locker);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedLocker(null);
  };

 const handleSave = (data) => {
  if (selectedLocker) {
    setLockers((prev) =>
      prev.map((item) =>
        item.id === data.id
          ? data
          : item
      )
    );
  } else {
    setLockers((prev) => [
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

        <SmartLockerTable
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

      <SmartLockerModal
        open={openModal}
        locker={selectedLocker}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
}

export default SmartLockerConfig;