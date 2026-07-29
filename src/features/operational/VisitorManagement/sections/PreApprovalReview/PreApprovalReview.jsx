import { useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Select from "../../../../../components/Common/Select/Select";
import Table from "../../../../../components/Common/Table/Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import Modal from "../../../../../components/Common/Modal/Modal";
import columns from "./constants/tableColumns";
import PreApprovalData from "./data/PreApprovalData";
import Button from "../../../../../components/Common/Button/Button";

function PreApprovalReview() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const filteredData = PreApprovalData.filter((item) => {
    const matchesSearch =
      item.passId.toLowerCase().includes(search.toLowerCase()) ||
      item.visitor.toLowerCase().includes(search.toLowerCase()) ||
      item.unit.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || item.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
            }}
          >
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />

            <Select
              value={status}
              onChange={setStatus}
              options={[
                { label: "All", value: "All" },
                { label: "Active", value: "Active" },
                { label: "Expired", value: "Expired" },
                { label: "Cancelled", value: "Cancelled" },
              ]}
            />
          </div>

          <span
            style={{
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            {filteredData.length} records
          </span>
        </div>

        <Table
          columns={columns(handleOpenModal)}
          data={filteredData}
        />

        <Pagination
          currentPage={1}
          totalPages={1}
        />
      </Card>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={`Override pre-approval — ${selectedRow?.passId || ""}`}
        width="700px"
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                console.log("Cancel Pass");
              }}
            >
              Cancel Pass
            </Button>

            <Button
              variant="primary"
              onClick={() => {
                console.log("Save Extension");
              }}
            >
              Save Extension
            </Button>
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            marginBottom: 25,
          }}
        >
          <span className="purpose-badge">
            {selectedRow?.purpose}
          </span>

          <span style={{ color: "#6b7280" }}>
            Raised by Ramesh Pillai
          </span>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontWeight: 600,
              display: "block",
              marginBottom: 8,
            }}
          >
            EXTEND VALID UNTIL
          </label>

          <input
            type="datetime-local"
            defaultValue="2026-07-09T21:00"
            style={{
              width: "100%",
              height: "45px",
              padding: "0 12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              fontWeight: 600,
              display: "block",
              marginBottom: 8,
            }}
          >
            ADMIN NOTE (VISIBLE TO RESIDENT)
          </label>

          <textarea
            rows={5}
            placeholder="Enter note..."
            style={{
              width: "100%",
              padding: 12,
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              resize: "none",
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export default PreApprovalReview;