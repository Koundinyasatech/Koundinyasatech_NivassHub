import { useMemo, useState, useEffect } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import SearchBox from "../../../../../components/Common/SearchBar/SearchBar";

import AGMResolutionTable from "./components/AGMResolutionTable";
import AGMResolutionModal from "./components/AGMResolutionModal";

const initialResolutions = [
  {
    id: 1,
    resolution: "Approve FY26-27 annual budget",
    quorumRequired: "51%",
    quorumMet: "64%",
    date: "2026-03-22",
    status: "Passed",
  },
  {
    id: 2,
    resolution: "Sanction clubhouse renovation ₹8L",
    quorumRequired: "51%",
    quorumMet: "38%",
    date: "2026-07-15",
    status: "Pending re-vote",
  },
];

function AGMResolutionManager() {
  const [resolutions, setResolutions] =
    useState(initialResolutions);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] =
    useState(null);

  const pageSize = 10;

  /*
   * Listen for the Draft Resolution button
   * from PollsVoting.jsx
   */
  useEffect(() => {
    const handleOpenModal = () => {
      setSelectedResolution(null);
      setModalOpen(true);
    };

    window.addEventListener(
      "open-agm-resolution-modal",
      handleOpenModal
    );

    return () => {
      window.removeEventListener(
        "open-agm-resolution-modal",
        handleOpenModal
      );
    };
  }, []);

  /*
   * Search
   */
  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return resolutions;
    }

    return resolutions.filter((item) =>
      [
        item.resolution,
        item.quorumRequired,
        item.quorumMet,
        item.date,
        item.status,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(keyword)
      )
    );
  }, [resolutions, search]);

  /*
   * Pagination
   */
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

  /*
   * Reset page when search changes
   */
  useEffect(() => {
    setPage(1);
  }, [search]);

  /*
   * Edit
   */
  const handleEdit = (resolution) => {
    setSelectedResolution(resolution);
    setModalOpen(true);
  };

  /*
   * Save
   */
  const handleSave = (formData) => {
    if (selectedResolution) {
      setResolutions((prev) =>
        prev.map((item) =>
          item.id === selectedResolution.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );
    } else {
      setResolutions((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          date: new Date()
            .toISOString()
            .split("T")[0],
        },
      ]);
    }

    setModalOpen(false);
    setSelectedResolution(null);
  };

  /*
   * Close modal
   */
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedResolution(null);
  };

  return (
    <>
      <Card>
        {/* SEARCH INSIDE CARD */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
          }}
        >
          <div
            style={{
              width: "220px",
              flexShrink: 0,
            }}
          >
            <SearchBox
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search..."
            />
          </div>

          <span
            style={{
              fontSize: "12px",
              color: "#4b5563",
            }}
          >
            {filteredData.length} records
          </span>
        </div>

        {/* TABLE */}
        <AGMResolutionTable
          resolutions={paginatedData}
          data={paginatedData}
          onEdit={handleEdit}
        />

        {/* PAGINATION */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Card>

      {/* MODAL */}
      <AGMResolutionModal
        open={modalOpen}
        resolution={selectedResolution}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </>
  );
}

export default AGMResolutionManager;