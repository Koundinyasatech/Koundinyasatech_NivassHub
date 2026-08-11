import { useState } from "react";

import AdminPage from "../../../../../components/Common/AdminPage/AdminPage";
import Button from "../../../../../components/Common/Button/Button";

import { pollTabs } from "../../constants/pollTabs";

import AGMResolutionFilters from "./components/AGMResolutionFilters";
import AGMResolutionTable from "./components/AGMResolutionTable";
import AGMResolutionModal from "./components/AGMResolutionModal";
function AGMResolutionManager() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingResolution, setEditingResolution] = useState(null);

  const handleAddResolution = () => {
    setEditingResolution(null);
    setShowModal(true);
  };

  const handleEditResolution = (resolution) => {
    setEditingResolution(resolution);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingResolution(null);
  };

  return (
    <AdminPage
      breadcrumb={["Community", "Polls & Voting"]}
      title="AGM Resolution Manager"
      tabs={pollTabs}
      activeTab="agmResolutionManager"
      onTabChange={() => {}}
      action={
        <Button onClick={handleAddResolution}>
          + Draft resolution
        </Button>
      }
    >
      <div className="agm-resolution-page">
        <AGMResolutionFilters
          search={search}
          onSearchChange={setSearch}
        />

        <AGMResolutionTable
          search={search}
          onEdit={handleEditResolution}
        />
      </div>

      <AGMResolutionModal
        open={showModal}
        resolution={editingResolution}
        onClose={handleCloseModal}
      />
    </AdminPage>
  );
}

export default AGMResolutionManager;