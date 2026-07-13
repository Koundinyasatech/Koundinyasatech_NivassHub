import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";

import { residentTabs } from "../constants/residentTabs";

import { ownerDummyData } from "../data/ownerDummyData";
import { tenantDummyData } from "../data/tenantDummyData";
import { familyMemberDummyData } from "../data/familyMemberDummyData";
import { vehicleDummyData } from "../data/vehicleDummyData";
import { kycDummyData } from "../data/kycDummyData";
import { moveInMoveOutDummyData } from "../data/moveInMoveOutDummyData";

import OwnerDrawer from "../components/OwnerDrawer";
import KYCReviewDrawer from "../components/KYCReviewDrawer";
import MoveProcessDrawer from "../components/MoveProcessDrawer";

function ResidentsUsers() {
  const [activeTab, setActiveTab] = useState("owners");

  // =====================================================
  // Owner State
  // =====================================================

  const [owners, setOwners] = useState(ownerDummyData);

  const [selectedOwner, setSelectedOwner] = useState(null);

  const [isOwnerDrawerOpen, setIsOwnerDrawerOpen] =
    useState(false);

  // =====================================================
  // Tenant State
  // =====================================================

  const [tenants, setTenants] =
    useState(tenantDummyData);

  // =====================================================
  // Family Members State
  // =====================================================

  const [familyMembers] = useState(
    familyMemberDummyData
  );

  // =====================================================
  // Vehicle State
  // =====================================================

  const [vehicles, setVehicles] =
    useState(vehicleDummyData);

  // =====================================================
  // KYC State
  // =====================================================

  const [kycRecords, setKycRecords] =
    useState(kycDummyData);

  const [selectedKYC, setSelectedKYC] =
    useState(null);

  const [isKycDrawerOpen, setIsKycDrawerOpen] =
    useState(false);

  // =====================================================
  // Move In / Move Out State
  // =====================================================

  const [moveRequests, setMoveRequests] =
    useState(moveInMoveOutDummyData);

  const [selectedMoveRequest, setSelectedMoveRequest] =
    useState(null);

  const [isMoveDrawerOpen, setIsMoveDrawerOpen] =
    useState(false);

  // =====================================================
  // Current Tab
  // =====================================================

  const currentTab = useMemo(
    () =>
      residentTabs.find(
        (tab) => tab.id === activeTab
      ),
    [activeTab]
  );

  const CurrentComponent = currentTab.component;

  // =====================================================
  // Owner Actions
  // =====================================================

  const handleOwnerEdit = (owner) => {
    setSelectedOwner(owner);
    setIsOwnerDrawerOpen(true);
  };

  const handleOwnerSave = (updatedOwner) => {
    setOwners((prev) =>
      prev.map((owner) =>
        owner.id === updatedOwner.id
          ? updatedOwner
          : owner
      )
    );

    setSelectedOwner(null);
    setIsOwnerDrawerOpen(false);
  };

  // =====================================================
  // Tenant Actions
  // =====================================================

  const handleToggleTenantStatus = (tenant) => {
    setTenants((prev) =>
      prev.map((item) =>
        item.id === tenant.id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : item
      )
    );
  };

  // =====================================================
  // Vehicle Actions
  // =====================================================

  const handleApproveVehicle = (vehicle) => {
    setVehicles((prev) =>
      prev.map((item) =>
        item.id === vehicle.id
          ? {
              ...item,
              status: "Approved",
            }
          : item
      )
    );
  };

  const handleRejectVehicle = (vehicle) => {
    setVehicles((prev) =>
      prev.filter(
        (item) => item.id !== vehicle.id
      )
    );
  };

  const handleViewVehicle = (vehicle) => {
    console.log("View Vehicle:", vehicle);
  };

  // =====================================================
  // KYC Actions
  // =====================================================

  const handleReviewKYC = (record) => {
    setSelectedKYC(record);
    setIsKycDrawerOpen(true);
  };

  const handleViewKYC = (record) => {
    setSelectedKYC(record);
    setIsKycDrawerOpen(true);
  };

  const handleApproveKYC = (updatedRecord) => {
    setKycRecords((prev) =>
      prev.map((item) =>
        item.id === updatedRecord.id
          ? {
              ...updatedRecord,
              status: "Approved",
            }
          : item
      )
    );

    setSelectedKYC(null);
    setIsKycDrawerOpen(false);
  };

  const handleRejectKYC = (updatedRecord) => {
    setKycRecords((prev) =>
      prev.map((item) =>
        item.id === updatedRecord.id
          ? {
              ...updatedRecord,
              status: "Rejected",
            }
          : item
      )
    );

    setSelectedKYC(null);
    setIsKycDrawerOpen(false);
  };

  // =====================================================
  // Move In / Move Out Actions
  // =====================================================

  const handleProcessMove = (request) => {
    setSelectedMoveRequest(request);
    setIsMoveDrawerOpen(true);
  };

  const handleSaveMove = (updatedRequest) => {
    setMoveRequests((prev) =>
      prev.map((item) =>
        item.id === updatedRequest.id
          ? updatedRequest
          : item
      )
    );

    setSelectedMoveRequest(null);
    setIsMoveDrawerOpen(false);
  };

  const handleCompleteMove = (updatedRequest) => {
    setMoveRequests((prev) =>
      prev.map((item) =>
        item.id === updatedRequest.id
          ? {
              ...updatedRequest,
              stage: "Completed",
            }
          : item
      )
    );

    setSelectedMoveRequest(null);
    setIsMoveDrawerOpen(false);
  };
  return (
    <>
      <AdminPage
        breadcrumb={[
          "Foundation",
          "Residents & Users",
          currentTab.label,
        ]}
        title={currentTab.title}
        subtitle={currentTab.subtitle}
        action={null}
        tabs={residentTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <CurrentComponent
          owners={owners}
          tenants={tenants}
          familyMembers={familyMembers}
          vehicles={vehicles}
          kycRecords={kycRecords}
          moveRequests={moveRequests}
          onEdit={
            activeTab === "owners"
              ? handleOwnerEdit
              : undefined
          }
          onToggleStatus={
            activeTab === "tenants"
              ? handleToggleTenantStatus
              : undefined
          }
          onApprove={
            activeTab === "vehicles"
              ? handleApproveVehicle
              : undefined
          }
          onReject={
            activeTab === "vehicles"
              ? handleRejectVehicle
              : undefined
          }
          onView={
            activeTab === "kyc"
              ? handleViewKYC
              : activeTab === "vehicles"
              ? handleViewVehicle
              : undefined
          }
          onReview={
            activeTab === "kyc"
              ? handleReviewKYC
              : undefined
          }
          onProcess={
            activeTab === "move"
              ? handleProcessMove
              : undefined
          }
        />
      </AdminPage>

      <OwnerDrawer
        open={isOwnerDrawerOpen}
        owner={selectedOwner}
        onClose={() => {
          setSelectedOwner(null);
          setIsOwnerDrawerOpen(false);
        }}
        onSave={handleOwnerSave}
      />

      <KYCReviewDrawer
        open={isKycDrawerOpen}
        record={selectedKYC}
        onClose={() => {
          setSelectedKYC(null);
          setIsKycDrawerOpen(false);
        }}
        onApprove={handleApproveKYC}
        onReject={handleRejectKYC}
      />

      <MoveProcessDrawer
        open={isMoveDrawerOpen}
        request={selectedMoveRequest}
        onClose={() => {
          setSelectedMoveRequest(null);
          setIsMoveDrawerOpen(false);
        }}
        onSave={handleSaveMove}
        onComplete={handleCompleteMove}
      />
    </>
  );
}

export default ResidentsUsers;