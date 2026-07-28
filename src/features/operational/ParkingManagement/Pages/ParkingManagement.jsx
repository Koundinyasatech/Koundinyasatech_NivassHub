import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";
import Button from "../../../../components/Common/Button/Button";

import { parkingTabs } from "../constants/parkingTabs";

function ParkingManagement() {
  const [activeTab, setActiveTab] = useState("catalogue");

  // =========================================
  // Slot Catalogue State
  // =========================================

  const [openSlotModal, setOpenSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // =========================================
  // Visitor Parking State
  // =========================================

  const [openVisitorModal, setOpenVisitorModal] =
    useState(false);

  const [selectedPass, setSelectedPass] =
    useState(null);

  // =========================================

  const currentTab = useMemo(
    () => parkingTabs.find((tab) => tab.id === activeTab),
    [activeTab]
  );

  const CurrentComponent = currentTab.component;

  // =========================================
  // Header Action Button
  // =========================================

  const renderAction = () => {
    switch (activeTab) {
      case "catalogue":
        return (
          <Button
            onClick={() => {
              setSelectedSlot(null);
              setOpenSlotModal(true);
            }}
          >
            + Add Slot
          </Button>
        );

      case "visitor":
        return (
          <Button
            onClick={() => {
              setSelectedPass(null);
              setOpenVisitorModal(true);
            }}
          >
            + Issue Pass
          </Button>
        );

      default:
        return null;
    }
  };

  // =========================================
  // Render Current Component
  // =========================================

  const renderCurrentComponent = () => {
    switch (activeTab) {
      case "catalogue":
        return (
          <CurrentComponent
            openModal={openSlotModal}
            setOpenModal={setOpenSlotModal}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        );

      case "visitor":
        return (
          <CurrentComponent
            openModal={openVisitorModal}
            setOpenModal={setOpenVisitorModal}
            selectedPass={selectedPass}
            setSelectedPass={setSelectedPass}
          />
        );

      default:
        return <CurrentComponent />;
    }
  };

  return (
    <AdminPage
      breadcrumb={[
        "Operational",
        "Parking Management",
        currentTab.label,
      ]}
      title={currentTab.title}
      subtitle={currentTab.subtitle}
      tabs={parkingTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      action={renderAction()}
    >
      {renderCurrentComponent()}
    </AdminPage>
  );
}

export default ParkingManagement;