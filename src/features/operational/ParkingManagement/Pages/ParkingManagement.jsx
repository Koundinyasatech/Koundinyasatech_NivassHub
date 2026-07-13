import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";
import { parkingTabs } from "../constants/parkingTabs";

function ParkingManagement() {
  const [activeTab, setActiveTab] =
    useState("catalogue");

  const currentTab = useMemo(
    () =>
      parkingTabs.find(
        (tab) => tab.id === activeTab
      ),
    [activeTab]
  );

  const CurrentComponent =
    currentTab.component;

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
      action={null}
    >
      <CurrentComponent />
    </AdminPage>
  );
}

export default ParkingManagement;