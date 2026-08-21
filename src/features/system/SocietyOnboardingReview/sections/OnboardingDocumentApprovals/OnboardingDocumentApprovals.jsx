import { useEffect, useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Select from "../../../../../components/Common/Select/Select";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import OnboardingTable from "./components/onboardingTable";
import OnboardingReviewModal from "./components/OnboardingReviewModal";

import { onboardingDummyData } from "./data/onboardingDummyData";

import {
  onboardingStatusOptions,
  onboardingSocietyOptions,
} from "./constants/onboardingOptions";

function OnboardingDocumentApprovals() {
  const [search, setSearch] = useState("");
  const [society, setSociety] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [records, setRecords] = useState(
    onboardingDummyData
  );

  const [selectedRecord, setSelectedRecord] =
    useState(null);

  const [isReviewOpen, setIsReviewOpen] =
    useState(false);

  const pageSize = 10;

  useEffect(() => {
    setPage(1);
  }, [search, society, status]);

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return records.filter((item) => {
      const matchesSearch =
        item.societyName
          .toLowerCase()
          .includes(keyword) ||
        item.societyCode
          .toLowerCase()
          .includes(keyword) ||
        item.documentType
          .toLowerCase()
          .includes(keyword);

      const matchesSociety =
        society === "" ||
        item.societyName === society;

      const matchesStatus =
        status === "" ||
        item.status === status;

      return (
        matchesSearch &&
        matchesSociety &&
        matchesStatus
      );
    });
  }, [records, search, society, status]);

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

  const handleReview = (record) => {
    setSelectedRecord(record);
    setIsReviewOpen(true);
  };

  const handleClose = () => {
    setSelectedRecord(null);
    setIsReviewOpen(false);
  };

  const updateRecord = (updatedRecord) => {
    setRecords((prev) =>
      prev.map((item) =>
        item.id === updatedRecord.id
          ? updatedRecord
          : item
      )
    );

    handleClose();
  };

  const handleApprove = (record) => {
    updateRecord({
      ...record,
      status: "Verified",
    });
  };

  const handleReject = (record) => {
    updateRecord({
      ...record,
      status: "Rejected",
    });
  };

  const onboardingCount = records.filter(
    (item) => item.status === "Pending"
  ).length;

  const awaitingReviewCount = records.filter(
    (item) => item.status === "Pending"
  ).length;

  const rejectedCount = records.filter(
    (item) => item.status === "Rejected"
  ).length;

  const readyToActivateCount = records.filter(
    (item) => item.status === "Verified"
  ).length;

  return (
    <>
      <div className="summary-grid">
        <Card>
          <div className="summary-card">
            <span>SOCIETIES ONBOARDING</span>
            <h2>{onboardingCount}</h2>
          </div>
        </Card>

        <Card>
          <div className="summary-card">
            <span>DOCUMENTS AWAITING REVIEW</span>
            <h2>{awaitingReviewCount}</h2>
          </div>
        </Card>

        <Card>
          <div className="summary-card">
            <span>DOCUMENTS REJECTED</span>
            <h2>{rejectedCount}</h2>
          </div>
        </Card>

        <Card>
          <div className="summary-card">
            <span>READY TO ACTIVATE</span>
            <h2>{readyToActivateCount}</h2>
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

          <Select
            value={society}
            options={onboardingSocietyOptions}
            placeholder="All societies"
            onChange={setSociety}
          />

          <Select
            value={status}
            options={onboardingStatusOptions}
            placeholder="All statuses"
            onChange={setStatus}
          />

          <div className="record-count">
            {filteredData.length} Records
          </div>
        </div>

        <OnboardingTable
          data={paginatedData}
          onReview={handleReview}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalRecords={filteredData.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </Card>

      <OnboardingReviewModal
        isOpen={isReviewOpen}
        record={selectedRecord}
        onClose={handleClose}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  );
}

export default OnboardingDocumentApprovals;