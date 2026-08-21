import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";
import Button from "../../../../components/Common/Button/Button";
import ConfirmDialog from "../../../../components/Common/ConfirmDialog/ConfirmDialog";

import { societyTabs } from "../constants/societyTabs";

import { towerDummyData } from "../data/towerDummyData";
import { unitDummyData } from "../data/unitDummyData";
import { ownershipDummyData } from "../data/ownershipDummyData";
import { adminRoleDummyData } from "../data/adminRoleDummyData";

import TowerModal from "../components/TowerModal";
import UnitModal from "../components/UnitModal";
import TransferOwnershipModal from "../components/TransferOwnershipModal";
import AdminRoleModal from "../components/AdminRoleModal";

import { societyPlanData } from "../../../system/BillingPlans/sections/SocietyPlanManagement/data/societyPlanData";
function SocietyUnits() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("profile");

  // =====================================================
  // Current Society
  // =====================================================

const currentSocietyId =
  location.state?.societyId ||
  sessionStorage.getItem("selectedSocietyId") ||
  societyPlanData[0]?.id;
  
  const currentSociety = useMemo(() => {
    return (
      societyPlanData.find(
        (society) => society.id === currentSocietyId
      ) || societyPlanData[0]
    );
  }, [currentSocietyId]);

  // =====================================================
  // Tower State
  // =====================================================

  const [towers, setTowers] = useState(towerDummyData);
  const [isTowerModalOpen, setIsTowerModalOpen] = useState(false);
  const [selectedTower, setSelectedTower] = useState(null);

  // =====================================================
  // Unit State
  // =====================================================

  const [units, setUnits] = useState(unitDummyData);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  // =====================================================
  // Ownership State
  // =====================================================

  const [ownerships, setOwnerships] =
    useState(ownershipDummyData);

  const [isTransferModalOpen, setIsTransferModalOpen] =
    useState(false);

  const [selectedOwnership, setSelectedOwnership] =
    useState(null);

  // =====================================================
  // Admin Role State
  // =====================================================

  const [roles, setRoles] = useState(adminRoleDummyData);

  const [isAdminRoleModalOpen, setIsAdminRoleModalOpen] =
    useState(false);

  const [selectedRole, setSelectedRole] = useState(null);

  // =====================================================
  // Delete Dialog
  // =====================================================

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  // =====================================================
  // Current Tab
  // =====================================================

  const currentTab = useMemo(
    () =>
      societyTabs.find(
        (tab) => tab.id === activeTab
      ),
    [activeTab]
  );

  const CurrentComponent = currentTab.component;

  // =====================================================
  // Header Action
  // =====================================================

  const handleHeaderAction = () => {
    switch (currentTab.action?.type) {
      case "tower":
        setSelectedTower(null);
        setIsTowerModalOpen(true);
        break;

      case "unit":
        setSelectedUnit(null);
        setIsUnitModalOpen(true);
        break;

      case "ownership":
        break;

      case "role":
        setSelectedRole(null);
        setIsAdminRoleModalOpen(true);
        break;

      default:
        break;
    }
  };

  // =====================================================
  // Tower CRUD
  // =====================================================

  const handleTowerEdit = (tower) => {
    setSelectedTower(tower);
    setIsTowerModalOpen(true);
  };

  const handleTowerDelete = (tower) => {
    setSelectedTower(tower);
    setDeleteDialogOpen(true);
  };

  const handleTowerSave = (towerData) => {
    if (selectedTower) {
      setTowers((prev) =>
        prev.map((tower) =>
          tower.id === selectedTower.id
            ? {
                ...tower,
                tower: towerData.towerName,
                wings: Number(towerData.wings),
                floors: Number(towerData.floors),
                namingConvention:
                  towerData.namingConvention,
              }
            : tower
        )
      );
    } else {
      setTowers((prev) => [
        ...prev,
        {
          id: Date.now(),
          tower: towerData.towerName,
          wings: Number(towerData.wings),
          floors: Number(towerData.floors),
          namingConvention:
            towerData.namingConvention,
          flats: 0,
        },
      ]);
    }

    setSelectedTower(null);
    setIsTowerModalOpen(false);
  };

  // =====================================================
  // Unit CRUD
  // =====================================================

  const handleUnitEdit = (unit) => {
    setSelectedUnit(unit);
    setIsUnitModalOpen(true);
  };

  const handleUnitDelete = (unit) => {
    setSelectedUnit(unit);
    setDeleteDialogOpen(true);
  };

  const handleUnitSave = (unitData) => {
    if (selectedUnit) {
      setUnits((prev) =>
        prev.map((unit) =>
          unit.id === selectedUnit.id
            ? {
                ...unit,
                ...unitData,
              }
            : unit
        )
      );
    } else {
      setUnits((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...unitData,
        },
      ]);
    }

    setSelectedUnit(null);
    setIsUnitModalOpen(false);
  };

  // =====================================================
  // Ownership CRUD
  // =====================================================

  const handleOwnershipTransfer = (ownership) => {
    setSelectedOwnership(ownership);
    setIsTransferModalOpen(true);
  };

  const handleOwnershipDelete = (ownership) => {
    setSelectedOwnership(ownership);
    setDeleteDialogOpen(true);
  };

  const handleOwnershipSave = (formData) => {
    setOwnerships((prev) =>
      prev.map((ownership) =>
        ownership.id === selectedOwnership.id
          ? {
              ...ownership,
              owner: formData.newOwner,
              possessionDate:
                formData.transferDate,
            }
          : ownership
      )
    );

    setSelectedOwnership(null);
    setIsTransferModalOpen(false);
  };

  // =====================================================
  // Admin Role CRUD
  // =====================================================

  const handleRoleEdit = (role) => {
    setSelectedRole(role);
    setIsAdminRoleModalOpen(true);
  };

  const handleRoleDelete = (role) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const handleRoleSave = (roleData) => {
    if (selectedRole) {
      setRoles((prev) =>
        prev.map((role) =>
          role.id === selectedRole.id
            ? {
                ...role,
                ...roleData,
              }
            : role
        )
      );
    } else {
      setRoles((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...roleData,
          status: "Active",
        },
      ]);
    }

    setSelectedRole(null);
    setIsAdminRoleModalOpen(false);
  };

  // =====================================================
  // Delete
  // =====================================================

  const confirmDelete = () => {
    if (activeTab === "towers" && selectedTower) {
      setTowers((prev) =>
        prev.filter(
          (tower) => tower.id !== selectedTower.id
        )
      );

      setSelectedTower(null);
    }

    if (activeTab === "units" && selectedUnit) {
      setUnits((prev) =>
        prev.filter(
          (unit) => unit.id !== selectedUnit.id
        )
      );

      setSelectedUnit(null);
    }

    if (
      activeTab === "ownership" &&
      selectedOwnership
    ) {
      setOwnerships((prev) =>
        prev.filter(
          (ownership) =>
            ownership.id !== selectedOwnership.id
        )
      );

      setSelectedOwnership(null);
    }

    if (activeTab === "roles" && selectedRole) {
      setRoles((prev) =>
        prev.filter(
          (role) => role.id !== selectedRole.id
        )
      );

      setSelectedRole(null);
    }

    setDeleteDialogOpen(false);
  };

  // =====================================================
  // Page Action
  // =====================================================

  const pageAction = currentTab.action ? (
    <Button onClick={handleHeaderAction}>
      {currentTab.action.text}
    </Button>
  ) : null;

  // =====================================================
  // Society Context Bar
  // =====================================================

const societyContextBar = (
  <div className="society-context-bar">
    <span className="society-context-dot">
      ●
    </span>

    <span className="society-context-label">
      Viewing
    </span>

    <strong className="society-context-name">
      {currentSociety?.society}
    </strong>

    <span className="society-context-location">
      · {currentSociety?.city}
    </span>

    <button
      type="button"
      className="society-context-switch"
      onClick={() =>
        navigate("/system-platform/billing-plans")
      }
    >
      Switch society
    </button>
  </div>
);
  // =====================================================
  // Render
  // =====================================================

  return (
    <>
      <AdminPage
        breadcrumb={[
          "Foundation",
          "Society & Units",
        ]}
        contextBar={societyContextBar}
        title={currentTab.title}
        subtitle={currentTab.subtitle}
        action={pageAction}
        tabs={societyTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <CurrentComponent
          currentSociety={currentSociety}
          towers={towers}
          units={units}
          ownerships={ownerships}
          roles={roles}
          onEdit={
            activeTab === "towers"
              ? handleTowerEdit
              : activeTab === "units"
              ? handleUnitEdit
              : activeTab === "roles"
              ? handleRoleEdit
              : undefined
          }
          onDelete={
            activeTab === "towers"
              ? handleTowerDelete
              : activeTab === "units"
              ? handleUnitDelete
              : activeTab === "ownership"
              ? handleOwnershipDelete
              : activeTab === "roles"
              ? handleRoleDelete
              : undefined
          }
          onTransfer={
            activeTab === "ownership"
              ? handleOwnershipTransfer
              : undefined
          }
        />
      </AdminPage>

      {/* Tower Modal */}

      <TowerModal
        open={isTowerModalOpen}
        tower={selectedTower}
        onClose={() => {
          setIsTowerModalOpen(false);
          setSelectedTower(null);
        }}
        onSave={handleTowerSave}
      />

      {/* Unit Modal */}

      <UnitModal
        open={isUnitModalOpen}
        unit={selectedUnit}
        towerOptions={towers.map((tower) => ({
          label: tower.tower,
          value: tower.tower,
        }))}
        onClose={() => {
          setIsUnitModalOpen(false);
          setSelectedUnit(null);
        }}
        onSave={handleUnitSave}
      />

      {/* Transfer Ownership Modal */}

      <TransferOwnershipModal
        open={isTransferModalOpen}
        record={selectedOwnership}
        onClose={() => {
          setIsTransferModalOpen(false);
          setSelectedOwnership(null);
        }}
        onSave={handleOwnershipSave}
      />

      {/* Admin Role Modal */}

      <AdminRoleModal
        open={isAdminRoleModalOpen}
        role={selectedRole}
        onClose={() => {
          setIsAdminRoleModalOpen(false);
          setSelectedRole(null);
        }}
        onSave={handleRoleSave}
      />

      {/* Delete Confirmation */}

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title={`Delete ${
          activeTab === "towers"
            ? "Tower"
            : activeTab === "units"
            ? "Unit"
            : activeTab === "ownership"
            ? "Ownership Record"
            : "Admin Role"
        }`}
        message={`Are you sure you want to delete "${
          activeTab === "towers"
            ? selectedTower?.tower
            : activeTab === "units"
            ? selectedUnit?.unitNumber
            : activeTab === "ownership"
            ? selectedOwnership?.unitNumber
            : selectedRole?.user
        }"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setSelectedTower(null);
          setSelectedUnit(null);
          setSelectedOwnership(null);
          setSelectedRole(null);
        }}
      />
    </>
  );
}

export default SocietyUnits;