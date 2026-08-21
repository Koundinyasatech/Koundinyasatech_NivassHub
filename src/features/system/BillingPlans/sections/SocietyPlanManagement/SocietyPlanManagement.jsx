import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Select from "../../../../../components/Common/Select/Select";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import Table from "../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../components/Common/Button/Button";
import Modal from "../../../../../components/Common/Modal/Modal";

import SocietyViewModal from "./components/SocietyViewModal";

import { societyPlanData } from "./data/societyPlanData";

import {
  PLAN_OPTIONS,
  STATUS_OPTIONS,
  CHANGE_PLAN_OPTIONS,
} from "./constants/societyPlanConstants";

function SocietyPlanManagement() {
  const navigate = useNavigate();

  // =========================================
  // Filters
  // =========================================

  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // =========================================
  // Society Data
  // =========================================

  const [societies, setSocieties] =
    useState(societyPlanData);

  // =========================================
  // View Details
  // =========================================

  const [viewSociety, setViewSociety] =
    useState(null);

  // =========================================
  // Change Plan
  // =========================================

  const [changePlanSociety, setChangePlanSociety] =
    useState(null);

  const [selectedPlan, setSelectedPlan] =
    useState("");

  const pageSize = 7;

  // =========================================
  // Filter Societies
  // =========================================

  const filteredSocieties = useMemo(() => {
    return societies.filter((society) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        society.society
          .toLowerCase()
          .includes(searchValue) ||
        society.city
          .toLowerCase()
          .includes(searchValue);

      const matchesPlan =
        !plan || society.plan === plan;

      const matchesStatus =
        !status || society.status === status;

      return (
        matchesSearch &&
        matchesPlan &&
        matchesStatus
      );
    });
  }, [societies, search, plan, status]);

  // =========================================
  // Pagination
  // =========================================

  const totalPages = Math.ceil(
    filteredSocieties.length / pageSize
  );

  const paginatedSocieties =
    filteredSocieties.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

  // =========================================
  // Summary
  // =========================================

  const activeSocieties = societies.filter(
    (society) => society.status === "Active"
  ).length;

  const totalUnits = societies.reduce(
    (total, society) =>
      total + society.units,
    0
  );

  const totalResidents = societies.reduce(
    (total, society) =>
      total + society.residents,
    0
  );

  const averageCollection = Math.round(
    societies.reduce(
      (total, society) =>
        total + society.collection,
      0
    ) / societies.length
  );

  // =========================================
  // Filter Handlers
  // =========================================

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handlePlanChange = (value) => {
    setPlan(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  // =========================================
  // View Details
  // =========================================

  const handleViewDetails = (society) => {
    setViewSociety(society);
  };

  const handleCloseViewDetails = () => {
    setViewSociety(null);
  };

  // =========================================
  // Open Workspace
  // =========================================

  const handleOpenWorkspace = (society) => {
    setViewSociety(null);

    navigate("/foundation/society", {
      state: {
        societyId: society.id,
        societyName: society.society,
        openTab: "society-profile",
      },
    });
  };

  // =========================================
  // Change Plan
  // =========================================

  const handleChangePlan = (society) => {
    setViewSociety(null);

    setChangePlanSociety(society);
    setSelectedPlan(society.plan);
  };

  const handleCloseChangePlan = () => {
    setChangePlanSociety(null);
    setSelectedPlan("");
  };

  const handleSavePlan = () => {
    if (!changePlanSociety || !selectedPlan) {
      return;
    }

    setSocieties((currentSocieties) =>
      currentSocieties.map((society) =>
        society.id === changePlanSociety.id
          ? {
              ...society,
              plan: selectedPlan,
            }
          : society
      )
    );

    handleCloseChangePlan();
  };

  // =========================================
  // Table Columns
  // =========================================

  const columns = [
    {
      key: "society",
      title: "Society",
      render: (row) => (
        <div>
          <strong>{row.society}</strong>
          <div>{row.city}</div>
        </div>
      ),
    },

    {
      key: "units",
      title: "Units",
    },

    {
      key: "residents",
      title: "Residents",
    },

    {
      key: "plan",
      title: "Plan",
    },

    {
      key: "status",
      title: "Status",
      render: (row) => (
        <StatusBadge status={row.status} />
      ),
    },

    {
      key: "collection",
      title: "Collection",
      render: (row) =>
        `${row.collection}%`,
    },

    {
      key: "openTickets",
      title: "Open Tickets",
    },

    {
      key: "lastActive",
      title: "Last Active",
    },

    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <div className="table-actions">
          <button
            type="button"
            className="table-action-btn"
            onClick={() =>
              handleViewDetails(row)
            }
          >
            View full details
          </button>

          <button
            type="button"
            className="table-action-btn"
            onClick={() =>
              handleOpenWorkspace(row)
            }
          >
            Open workspace
          </button>

          <button
            type="button"
            className="table-action-btn"
            onClick={() =>
              handleChangePlan(row)
            }
          >
            Change plan
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* =========================================
          Summary Cards
      ========================================= */}

      <div className="summary-grid">
        <Card
          title="Societies on platform"
          subtitle={`${activeSocieties} active`}
        >
          {societies.length}
        </Card>

        <Card title="Total units managed">
          {totalUnits}
        </Card>

        <Card title="Total residents">
          {totalResidents}
        </Card>

        <Card title="Avg. collection rate">
          {averageCollection}%
        </Card>
      </div>

      {/* =========================================
          Society Table
      ========================================= */}

      <Card>
        <div className="toolbar">
          <div className="toolbar-left">
            <Input
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
            />

            <Select
              value={plan}
              onChange={handlePlanChange}
              options={PLAN_OPTIONS}
              placeholder="All plans"
            />

            <Select
              value={status}
              onChange={handleStatusChange}
              options={STATUS_OPTIONS}
              placeholder="All statuses"
            />
          </div>

          <div className="record-count">
            {filteredSocieties.length} records
          </div>
        </div>

        <Table
          columns={columns}
          data={paginatedSocieties}
          emptyMessage="No societies found."
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={filteredSocieties.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </Card>

      {/* =========================================
          View Society Details
      ========================================= */}

      <SocietyViewModal
        society={viewSociety}
        onClose={handleCloseViewDetails}
        onChangePlan={handleChangePlan}
        onOpenWorkspace={handleOpenWorkspace}
      />

      {/* =========================================
          Change Plan Modal
      ========================================= */}

      <Modal
        open={Boolean(changePlanSociety)}
        onClose={handleCloseChangePlan}
        title="Change Plan"
      >
        {changePlanSociety && (
          <>
            <div className="form-group">
              <label>Society</label>

              <Input
                value={changePlanSociety.society}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Current Plan</label>

              <Input
                value={changePlanSociety.plan}
                readOnly
              />
            </div>

            <div className="form-group">
              <Select
                label="New Plan"
                value={selectedPlan}
                onChange={setSelectedPlan}
                options={CHANGE_PLAN_OPTIONS}
                placeholder="Select plan"
                required
              />
            </div>
          </>
        )}

        <div className="modal-footer">
          <Button
            variant="outline"
            onClick={handleCloseChangePlan}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSavePlan}
            disabled={!selectedPlan}
          >
            Change Plan
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default SocietyPlanManagement;