import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";
import Button from "../../../../components/Common/Button/Button";

import { packageTabs } from "../constants/packageTabs";

function PackageDelivery() {
  const [activeTab, setActiveTab] =
    useState("intake");

  // =========================================
  // Smart Locker State
  // =========================================

  const [openLockerModal, setOpenLockerModal] =
    useState(false);

  const [selectedLocker, setSelectedLocker] =
    useState(null);

  // =========================================
  // Courier State
  // =========================================

  const [openCourierModal, setOpenCourierModal] =
    useState(false);

  const [selectedCourier, setSelectedCourier] =
    useState(null);

  // =========================================

  const currentTab = useMemo(
    () =>
      packageTabs.find(
        (tab) => tab.id === activeTab
      ),
    [activeTab]
  );

  const CurrentComponent =
    currentTab.component;

  // =========================================
  // Header Action Button
  // =========================================
const renderAction = () => {
  switch (activeTab) {
    case "locker":
      return (
        <Button
          onClick={() => {
            setSelectedLocker(null);
            setOpenLockerModal(true);
          }}
        >
          + Add Locker Bank
        </Button>
      );

    case "courier":
      return (
        <Button
          onClick={() => {
            setSelectedCourier(null);
            setOpenCourierModal(true);
          }}
        >
          + Add Courier
        </Button>
      );

    case "handover":
      return (
        <Button
          variant="outline"
          onClick={() => {
            console.log("Export Clicked");
          }}
        >
          Export
        </Button>
      );

    default:
      return null;
  }
};

  // =========================================
  // Render Current Tab
  // =========================================

  const renderCurrentComponent = () => {
    switch (activeTab) {
      case "locker":
        return (
          <CurrentComponent
            openModal={openLockerModal}
            setOpenModal={setOpenLockerModal}
            selectedLocker={selectedLocker}
            setSelectedLocker={setSelectedLocker}
          />
        );

      case "courier":
        return (
          <CurrentComponent
            openModal={openCourierModal}
            setOpenModal={setOpenCourierModal}
            selectedCourier={selectedCourier}
            setSelectedCourier={setSelectedCourier}
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
        "Package Delivery",
        currentTab.label,
      ]}
      title={currentTab.title}
      subtitle={currentTab.subtitle}
      tabs={packageTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      action={renderAction()}
    >
      {renderCurrentComponent()}
    </AdminPage>
  );
}

export default PackageDelivery;