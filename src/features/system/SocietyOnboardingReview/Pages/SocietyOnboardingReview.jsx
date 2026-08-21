import { useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";

import OnboardingDocumentApprovals from "../sections/OnboardingDocumentApprovals/OnboardingDocumentApprovals";

function SocietyOnboardingReview() {
  const [activeTab, setActiveTab] = useState("onboarding");

  const tabs = [
    {
      id: "onboarding",
      label: "Onboarding Document Approvals",
      title: "Onboarding Document Approvals",
      subtitle: "Review and approve society onboarding documents.",
      component: OnboardingDocumentApprovals,
    },
  ];

  const currentTab = tabs.find(
    (tab) => tab.id === activeTab
  );

  const CurrentComponent = currentTab.component;

  return (
    <AdminPage
      breadcrumb={[
        "System / Platform",
        "Society Onboarding Review",
      ]}
      title={currentTab.title}
      subtitle={currentTab.subtitle}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <CurrentComponent />
    </AdminPage>
  );
}

export default SocietyOnboardingReview;