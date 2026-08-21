import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";

import { noticeTabs } from "../constants/noticeTabs";

function NoticesCommunication() {
  const [activeTab, setActiveTab] =
    useState("noticeComposer");

  const currentTab = useMemo(
    () =>
      noticeTabs.find(
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
        "Notices & Communication",
        currentTab.label,
      ]}
      title="Notices & Communication"
      subtitle={currentTab.label}
      tabs={noticeTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <CurrentComponent />
    </AdminPage>
  );
}

export default NoticesCommunication;