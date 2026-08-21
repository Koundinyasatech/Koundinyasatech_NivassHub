import { useEffect, useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import SearchBox from "../../../../../components/Common/SearchBar/SearchBar";

import CommitteeElectionTable from "./components/CommitteeElectionTable";
import CommitteeElectionModal from "./components/CommitteeElectionModal";

import {
  initialCommitteeElections,
} from "./data/committeeElections";

function CommitteeElectionSetup() {
  const [elections, setElections] = useState(
    initialCommitteeElections
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedElection, setSelectedElection] =
    useState(null);

  const pageSize = 10;

  /*
   * Open Add Nomination modal
   *
   * This event name MUST match PollsVoting.jsx
   */
  useEffect(() => {
    const handleOpenModal = () => {
      setSelectedElection(null);
      setModalOpen(true);
    };

    window.addEventListener(
      "open-committee-nomination-modal",
      handleOpenModal
    );

    return () => {
      window.removeEventListener(
        "open-committee-nomination-modal",
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
      return elections;
    }

    return elections.filter((item) =>
      [
        item.candidate,
        item.unit,
        item.position,
        item.nominated,
        item.status,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(keyword)
      )
    );
  }, [elections, search]);

  /*
   * Pagination
   */
  const totalRecords = filteredData.length;

  const totalPages = Math.ceil(
    totalRecords / pageSize
  );

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredData.slice(
      start,
      start + pageSize
    );
  }, [filteredData, page]);

  /*
   * Reset to page 1 when search changes
   */
  useEffect(() => {
    setPage(1);
  }, [search]);

  /*
   * Prevent invalid page after data changes
   */
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }

    if (totalPages === 0 && page !== 1) {
      setPage(1);
    }
  }, [page, totalPages]);

  /*
   * View
   */
  const handleView = (election) => {
    setSelectedElection(election);
    setModalOpen(true);
  };

  /*
   * Approve
   */
  const handleApprove = (election) => {
    setElections((prev) =>
      prev.map((item) =>
        item.id === election.id
          ? {
              ...item,
              status: "Approved",
            }
          : item
      )
    );
  };

  /*
   * Reject
   */
  const handleReject = (election) => {
    setElections((prev) =>
      prev.map((item) =>
        item.id === election.id
          ? {
              ...item,
              status: "Rejected",
            }
          : item
      )
    );
  };

  /*
   * Save nomination
   */
  const handleSave = (formData) => {
    if (selectedElection) {
      setElections((prev) =>
        prev.map((item) =>
          item.id === selectedElection.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );
    } else {
      setElections((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          nominated:
            formData.nominated ||
            new Date()
              .toISOString()
              .split("T")[0],
          status:
            formData.status || "Pending",
        },
      ]);
    }

    setModalOpen(false);
    setSelectedElection(null);
  };

  /*
   * Close modal
   */
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedElection(null);
  };

  return (
    <>
      <Card>
        {/* SEARCH + RECORD COUNT */}
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
            {totalRecords} records
          </span>
        </div>

        {/* TABLE */}
        <CommitteeElectionTable
          data={paginatedData}
          onView={handleView}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {/* PAGINATION */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalRecords={totalRecords}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </Card>

      {/* MODAL */}
      <CommitteeElectionModal
        open={modalOpen}
        election={selectedElection}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </>
  );
}

export default CommitteeElectionSetup;