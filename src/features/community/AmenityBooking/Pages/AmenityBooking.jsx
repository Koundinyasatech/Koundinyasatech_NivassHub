import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";

import { amenityTabs } from "../constants/amenityTabs";

function AmenityBooking() {
  const [activeTab, setActiveTab] =
    useState("catalogue");

  const currentTab = useMemo(
    () =>
      amenityTabs.find(
        (tab) => tab.id === activeTab
      ),
    [activeTab]
  );

  const CurrentComponent =
    currentTab.component;

  return (
    <AdminPage
      breadcrumb={[
        "Community",
        "Amenity Booking",
        currentTab.label,
      ]}
      title="Amenity Booking"
      subtitle={currentTab.label}
      tabs={amenityTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <CurrentComponent />
    </AdminPage>
  );
}

export default AmenityBooking;