import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";
import Button from "../../../../components/Common/Button/Button";

import { billingPlansTabs } from "../constants/billingPlansTabs";

import RegisterSocietyModal from "../sections/SocietyPlanManagement/components/RegisterSocietyModal";

function BillingPlans() {
  const [activeTab, setActiveTab] =
    useState("plans");

  const [openRegisterModal, setOpenRegisterModal] =
    useState(false);

  // =========================================
  // Current Tab
  // =========================================

  const currentTab = useMemo(
    () =>
      billingPlansTabs.find(
        (tab) => tab.id === activeTab
      ),
    [activeTab]
  );

  const CurrentComponent =
    currentTab.component;

  // =========================================
  // Export CSV
  // =========================================

  const handleExportCSV = () => {
    console.log("Export CSV clicked");
  };

  // =========================================
  // Header Actions
  // =========================================

 const renderAction = () => {
  if (activeTab === "plans") {
    return (
      <div className="table-actions">
        <Button
          onClick={() =>
            setOpenRegisterModal(true)
          }
        >
           Register society
        </Button>

        <Button
          variant="outline"
          onClick={handleExportCSV}
        >
          Export CSV
        </Button>
      </div>
    );
  }

  return null;
};

  

  // =========================================
  // Render
  // =========================================

  return (
    <>
      <AdminPage
        breadcrumb={[
          "System / Platform",
          "Billing & Plans",
        ]}
        title={currentTab.title}
        subtitle={currentTab.subtitle}
        tabs={billingPlansTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        action={renderAction()}
      >
        <CurrentComponent />
      </AdminPage>

      <RegisterSocietyModal
        open={openRegisterModal}
        onClose={() =>
          setOpenRegisterModal(false)
        }
      />
    </>
  );
}

export default BillingPlans;