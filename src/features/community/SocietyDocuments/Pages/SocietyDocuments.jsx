import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";

import { documentTabs } from "../constants/documentTabs";

function SocietyDocuments() {
  const [activeTab, setActiveTab] =
    useState("documentRepository");

  const currentTab = useMemo(
    () =>
      documentTabs.find(
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
        "Society Documents",
        currentTab.label,
      ]}
      title={currentTab.label}
      tabs={documentTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <CurrentComponent />
    </AdminPage>
  );
}

export default SocietyDocuments;