import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";

import { packageTabs } from "../constants/packageTabs";

function PackageDelivery() {
  const [activeTab, setActiveTab] =
    useState("intake");

  const currentTab = useMemo(
    () =>
      packageTabs.find(
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
        "Package Delivery",
        currentTab.label,
      ]}
      title={currentTab.title}
      subtitle={currentTab.subtitle}
      tabs={packageTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      action={null}
    >
      <CurrentComponent />
    </AdminPage>
  );
}

export default PackageDelivery;