import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";

import { smartAccessTabs } from "../constants/smartAccessTabs";

function SmartAccessControl() {
  const [activeTab, setActiveTab] =
    useState("qrGate");

  // =====================================================
  // QR Gate Pass Management
  // =====================================================

  const [gatePasses, setGatePasses] =
    useState([]);

  // =====================================================
  // Boom Barrier Configuration
  // =====================================================

  const [barrierConfigs, setBarrierConfigs] =
    useState([]);

  // =====================================================
  // Video Intercom Settings
  // =====================================================

  const [intercomSettings, setIntercomSettings] =
    useState([]);

  // =====================================================
  // Face Recognition Enrollment
  // =====================================================

  const [faceEnrollments, setFaceEnrollments] =
    useState([]);

  // =====================================================
  // Multi Gate Log
  // =====================================================

  const [gateLogs, setGateLogs] =
    useState([]);

  // =====================================================
  // Access Anomaly AI
  // =====================================================

  const [anomalyLogs, setAnomalyLogs] =
    useState([]);

  // =====================================================
  // Current Tab
  // =====================================================

  const currentTab = useMemo(
    () =>
      smartAccessTabs.find(
        (tab) => tab.id === activeTab
      ),
    [activeTab]
  );

  const CurrentComponent =
    currentTab.component;

  // =====================================================
  // QR Gate Pass Functions
  // =====================================================

  const handleCreateGatePass = () => {};

  const handleEditGatePass = (pass) => {};

  const handleDeleteGatePass = (pass) => {};

  // =====================================================
  // Boom Barrier Functions
  // =====================================================

  const handleSaveBarrierConfig = (
    config
  ) => {};

  const handleResetBarrierConfig = () => {};

  // =====================================================
  // Video Intercom Functions
  // =====================================================

  const handleSaveIntercom = (
    settings
  ) => {};

  const handleTestIntercom = () => {};

  // =====================================================
  // Face Recognition Functions
  // =====================================================

  const handleEnrollFace = () => {};

  const handleUpdateFace = (
    resident
  ) => {};

  const handleDeleteFace = (
    resident
  ) => {};

  // =====================================================
  // Multi Gate Log Functions
  // =====================================================

  const handleViewGateLog = (log) => {};

  const handleExportGateLogs = () => {};

  // =====================================================
  // Access Anomaly Functions
  // =====================================================

  const handleViewAnomaly = (
    anomaly
  ) => {};

  const handleResolveAnomaly = (
    anomaly
  ) => {};

  return (
    <AdminPage
      breadcrumb={[
        "Operational",
        "Smart Access Control",
        currentTab.label,
      ]}
      title={currentTab.title}
      subtitle={currentTab.subtitle}
      action={null}
      tabs={smartAccessTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <CurrentComponent
        gatePasses={gatePasses}
        barrierConfigs={barrierConfigs}
        intercomSettings={
          intercomSettings
        }
        faceEnrollments={
          faceEnrollments
        }
        gateLogs={gateLogs}
        anomalyLogs={anomalyLogs}
        onCreateGatePass={
          handleCreateGatePass
        }
        onEditGatePass={
          handleEditGatePass
        }
        onDeleteGatePass={
          handleDeleteGatePass
        }
        onSaveBarrierConfig={
          handleSaveBarrierConfig
        }
        onResetBarrierConfig={
          handleResetBarrierConfig
        }
        onSaveIntercom={
          handleSaveIntercom
        }
        onTestIntercom={
          handleTestIntercom
        }
        onEnrollFace={
          handleEnrollFace
        }
        onUpdateFace={
          handleUpdateFace
        }
        onDeleteFace={
          handleDeleteFace
        }
        onViewGateLog={
          handleViewGateLog
        }
        onExportGateLogs={
          handleExportGateLogs
        }
        onViewAnomaly={
          handleViewAnomaly
        }
        onResolveAnomaly={
          handleResolveAnomaly
        }
      />
    </AdminPage>
  );
}

export default SmartAccessControl;