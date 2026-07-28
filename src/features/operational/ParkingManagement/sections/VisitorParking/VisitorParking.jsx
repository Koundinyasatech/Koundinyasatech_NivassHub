import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import VisitorParkingTable from "./components/VisitorParkingTable";
import VisitorParkingModal from "./components/VisitorParkingModal";

import {
  visitorParkingDummyData,
  visitorSlotOptions,
} from "./data/visitorParkingDummyData";

function VisitorParking({
  openModal,
  setOpenModal,
  selectedPass,
  setSelectedPass,
}) {
  // =========================================
  // State
  // =========================================

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [passes, setPasses] =
    useState(visitorParkingDummyData);

  const pageSize = 10;

  // =========================================
  // Dashboard
  // =========================================

  const occupiedNow = passes.filter(
    (item) => item.status === "Occupied"
  ).length;

  const freeVisitorSlots =
    visitorSlotOptions.length -
    occupiedNow;

  // =========================================
  // Filter
  // =========================================

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return passes.filter((item) =>
      [
        item.pass,
        item.slot,
        item.visitor,
        item.unit,
        item.validUntil,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [passes, search]);

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

  const handleView = (pass) => {
    setSelectedPass(pass);
    setOpenModal(true);
  };

  const handleRevoke = (pass) => {
    setPasses((prev) =>
      prev.map((item) =>
        item.id === pass.id
          ? {
              ...item,
              status: "Expired",
            }
          : item
      )
    );
  };

  const handleClose = () => {
    setSelectedPass(null);
    setOpenModal(false);
  };

  const handleSave = (data) => {
    if (selectedPass) {
      setPasses((prev) =>
        prev.map((item) =>
          item.id === data.id
            ? data
            : item
        )
      );
    } else {
      setPasses((prev) => [
        ...prev,
        {
          ...data,
          id: Date.now(),
          pass: `VP-${900 + prev.length + 1}`,
          status: "Occupied",
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
      <div className="summary-grid">
        <Card>
          <div className="summary-grid">
            <span>
              FREE VISITOR SLOTS
            </span>

            <h2>{freeVisitorSlots}</h2>
          </div>
        </Card>

        <Card>
          <div className="two-column-grid">
            <span>
              OCCUPIED NOW
            </span>

            <h2>{occupiedNow}</h2>
          </div>
        </Card>
      </div>

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

        <VisitorParkingTable
          data={paginatedData}
          onView={handleView}
          onRevoke={handleRevoke}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalRecords={filteredData.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </Card>

      <VisitorParkingModal
        open={openModal}
        pass={selectedPass}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
}

export default VisitorParking;