import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";

import { visitorTabs } from "../constants/visitorTabs";

function VisitorManagement() {
  const [activeTab, setActiveTab] =
    useState("preapproval");

  const currentTab = useMemo(
    () =>
      visitorTabs.find(
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
        "Visitor Management",
        currentTab.label,
      ]}
      title={currentTab.title}
      subtitle={currentTab.subtitle}
      tabs={visitorTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      action={null}
    >
      <CurrentComponent />
    </AdminPage>
  );
}

export default VisitorManagement;