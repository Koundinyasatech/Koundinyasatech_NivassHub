import { useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Select from "../../../../../components/Common/Select/Select";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import AccessAnomalyTable from "./components/AccessAnomalyTable";
import ReviewAlertModal from "./components/ReviewAlertModal";

import accessAnomalyColumns from "./constants/accessAnomalyColumns";
import accessAnomalyData from "./data/accessAnomalyData";
import statusOptions from "./constants/statusOptions";

function AccessAnomalyAI() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Table Data
  const [tableData, setTableData] = useState(accessAnomalyData);

  const filteredData = tableData.filter((item) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      item.id.toLowerCase().includes(searchText) ||
      item.detail.toLowerCase().includes(searchText);

    const matchStatus =
      status === "All" || item.status === status;

    return matchSearch && matchStatus;
  });

  // Review Button
  const handleReview = (row) => {
    setSelectedAlert(row);
    setIsReviewOpen(true);
  };

  // View Button
  const handleView = (row) => {
    console.log("View:", row);
  };

  // Close Modal
  const handleClose = () => {
    setIsReviewOpen(false);
    setSelectedAlert(null);
  };

  // Mark Reviewed
  const handleMarkReviewed = (row) => {
    setTableData((prev) =>
      prev.map((item) =>
        item.id === row.id
          ? {
              ...item,
              status: "Reviewed",
              action: "View",
            }
          : item
      )
    );

    handleClose();
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

        <AccessAnomalyTable
          columns={accessAnomalyColumns}
          data={filteredData}
          onReview={handleReview}
          onView={handleView}
        />

        <Pagination
          currentPage={1}
          totalPages={2}
          totalRecords={filteredData.length}
          pageSize={10}
          onPageChange={() => {}}
        />
      </Card>

      <ReviewAlertModal
        open={isReviewOpen}
        data={selectedAlert}
        onClose={handleClose}
        onMarkReviewed={handleMarkReviewed}
      />
    </>
  );
}

export default AccessAnomalyAI;