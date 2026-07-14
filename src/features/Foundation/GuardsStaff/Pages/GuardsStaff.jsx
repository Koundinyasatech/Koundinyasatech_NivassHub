import { useMemo, useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";
import Button from "../../../../components/Common/Button/Button";

import { guardTabs } from "../constants/guardTabs";

import { guardDummyData } from "../sections/GuardProfiles/data/guardDummyData";
import { shiftRosterDummyData } from "../sections/ShiftRoster/data/shiftRosterDummyData";
import { clockLogsDummyData } from "../sections/ClockLogs/data/clockLogsDummyData";

import { domesticStaffDummyData } from "../sections/DomesticStaff/data/domesticStaffDummyData";
import { staffTypeDummyData } from "../sections/DomesticStaff/data/staffTypeDummyData";
import { linkedFlatsDummyData } from "../sections/DomesticStaff/data/linkedFlatsDummyData";

import GuardModal from "../sections/GuardProfiles/components/GuardModal";
import ShiftRosterModal from "../sections/ShiftRoster/components/ShiftRosterModal";
import ClockLogModal from "../sections/ClockLogs/components/ClockLogModal";
import DomesticStaffModal from "../sections/DomesticStaff/components/DomesticStaffModal";

function GuardsStaff() {
  const [activeTab, setActiveTab] =
    useState("profiles");

  const [guards, setGuards] =
    useState(guardDummyData);

  const [selectedGuard, setSelectedGuard] =
    useState(null);

  const [isGuardModalOpen, setIsGuardModalOpen] =
    useState(false);

  const [shiftRoster, setShiftRoster] =
    useState(shiftRosterDummyData);

  const [selectedShift, setSelectedShift] =
    useState(null);

  const [isShiftModalOpen, setIsShiftModalOpen] =
    useState(false);

  const [clockLogs, setClockLogs] =
    useState(clockLogsDummyData);

  const [selectedClockLog, setSelectedClockLog] =
    useState(null);

  const [isClockLogModalOpen, setIsClockLogModalOpen] =
    useState(false);

  const [domesticStaff, setDomesticStaff] =
    useState(domesticStaffDummyData);

  const [staffTypes] = useState(
    staffTypeDummyData
  );

  const [linkedFlats] = useState(
    linkedFlatsDummyData
  );

  const [selectedStaff, setSelectedStaff] =
    useState(null);

  const [isStaffModalOpen, setIsStaffModalOpen] =
    useState(false);

  const [attendance, setAttendance] =
    useState([]);

  const [agencies, setAgencies] =
    useState([]);

  const currentTab = useMemo(
    () =>
      guardTabs.find(
        (tab) => tab.id === activeTab
      ),
    [activeTab]
  );

  const CurrentComponent =
    currentTab.component;
      // =====================================================
  // Guard Profile Functions
  // =====================================================

  const handleAddGuard = () => {
    setSelectedGuard(null);
    setIsGuardModalOpen(true);
  };

  const handleEditGuard = (guard) => {
    setSelectedGuard(guard);
    setIsGuardModalOpen(true);
  };

  const handleSaveGuard = (guard) => {
    if (guard.id) {
      setGuards((prev) =>
        prev.map((item) =>
          item.id === guard.id
            ? guard
            : item
        )
      );
    } else {
      setGuards((prev) => [
        ...prev,
        {
          ...guard,
          id: Date.now(),
        },
      ]);
    }

    setSelectedGuard(null);
    setIsGuardModalOpen(false);
  };

  const handleDeleteGuard = (guard) => {
    setGuards((prev) =>
      prev.filter(
        (item) => item.id !== guard.id
      )
    );
  };

  // =====================================================
  // Shift Roster Functions
  // =====================================================

  const handleAssignShift = () => {
    setSelectedShift(null);
    setIsShiftModalOpen(true);
  };

  const handleEditShift = (shift) => {
    setSelectedShift(shift);
    setIsShiftModalOpen(true);
  };

  const handleSaveShift = (shift) => {
    if (shift.id) {
      setShiftRoster((prev) =>
        prev.map((item) =>
          item.id === shift.id
            ? shift
            : item
        )
      );
    } else {
      setShiftRoster((prev) => [
        ...prev,
        {
          ...shift,
          id: Date.now(),
        },
      ]);
    }

    setSelectedShift(null);
    setIsShiftModalOpen(false);
  };

  const handleDeleteShift = (shift) => {
    setShiftRoster((prev) =>
      prev.filter(
        (item) => item.id !== shift.id
      )
    );
  };

  // =====================================================
  // Clock Logs Functions
  // =====================================================

  const handleAddClockLog = () => {
    setSelectedClockLog(null);
    setIsClockLogModalOpen(true);
  };

  const handleViewClockLog = (log) => {
    setSelectedClockLog(log);
    setIsClockLogModalOpen(true);
  };

  const handleSaveClockLog = (log) => {
    if (log.id) {
      setClockLogs((prev) =>
        prev.map((item) =>
          item.id === log.id
            ? log
            : item
        )
      );
    } else {
      setClockLogs((prev) => [
        ...prev,
        {
          ...log,
          id: Date.now(),
        },
      ]);
    }

    setSelectedClockLog(null);
    setIsClockLogModalOpen(false);
  };

  const handleDeleteClockLog = (log) => {
    setClockLogs((prev) =>
      prev.filter(
        (item) => item.id !== log.id
      )
    );
  };

  const handleExportClockLogs = () => {
    console.log("Export Clock Logs");
  };

  // =====================================================
  // Domestic Staff Functions
  // =====================================================

  const handleAddStaff = () => {
    setSelectedStaff(null);
    setIsStaffModalOpen(true);
  };

  const handleEditStaff = (staff) => {
    setSelectedStaff(staff);
    setIsStaffModalOpen(true);
  };

  const handleSaveStaff = (staff) => {
    if (staff.id) {
      setDomesticStaff((prev) =>
        prev.map((item) =>
          item.id === staff.id
            ? staff
            : item
        )
      );
    } else {
      setDomesticStaff((prev) => [
        ...prev,
        {
          ...staff,
          id: Date.now(),
        },
      ]);
    }

    setSelectedStaff(null);
    setIsStaffModalOpen(false);
  };

  const handleDeleteStaff = (staff) => {
    setDomesticStaff((prev) =>
      prev.filter(
        (item) => item.id !== staff.id
      )
    );
  };

  // =====================================================
  // Attendance Functions
  // =====================================================

  const handleMarkAttendance = (
    record
  ) => {
    console.log(
      "Mark Attendance",
      record
    );
  };

  const handleViewAttendance = (
    record
  ) => {
    console.log(
      "View Attendance",
      record
    );
  };

  // =====================================================
  // Agency Management Functions
  // =====================================================

  const handleAddAgency = () => {
    console.log("Add Agency");
  };

  const handleEditAgency = (
    agency
  ) => {
    console.log(
      "Edit Agency",
      agency
    );
  };

  const handleDeleteAgency = (
    agency
  ) => {
    console.log(
      "Delete Agency",
      agency
    );
  };
    return (
    <>
      <AdminPage
        breadcrumb={[
          "Foundation",
          "Guards & Staff",
          currentTab.label,
        ]}
        title={currentTab.title}
        subtitle={currentTab.subtitle}
        action={
          activeTab === "profiles" ? (
            <Button onClick={handleAddGuard}>
              + Onboard Guard
            </Button>
          ) : activeTab === "shiftRoster" ? (
            <Button onClick={handleAssignShift}>
              + Assign Shift
            </Button>
          ) : activeTab === "clockLogs" ? (
            <Button onClick={handleAddClockLog}>
              + Add Clock Log
            </Button>
          ) : activeTab === "domesticStaff" ? (
            <Button onClick={handleAddStaff}>
              + Add Staff
            </Button>
          ) : activeTab === "attendance" ? (
            <Button
              onClick={() =>
                handleMarkAttendance(null)
              }
            >
              Mark Attendance
            </Button>
          ) : activeTab ===
            "agencyManagement" ? (
            <Button onClick={handleAddAgency}>
              + Add Agency
            </Button>
          ) : null
        }
        tabs={guardTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <CurrentComponent
          guards={guards}
          shiftRoster={shiftRoster}
          clockLogs={clockLogs}
          domesticStaff={domesticStaff}
          attendance={attendance}
          agencies={agencies}

          staffTypes={staffTypes}
          linkedFlats={linkedFlats}

          onAddGuard={handleAddGuard}
          onEditGuard={handleEditGuard}
          onDeleteGuard={handleDeleteGuard}

          onAssignShift={handleAssignShift}
          onEditShift={handleEditShift}
          onSaveShift={handleSaveShift}
          onDeleteShift={handleDeleteShift}

          onAddClockLog={handleAddClockLog}
          onViewClockLog={handleViewClockLog}
          onSaveClockLog={handleSaveClockLog}
          onDeleteClockLog={handleDeleteClockLog}
          onExportClockLogs={handleExportClockLogs}

          onAddStaff={handleAddStaff}
          onEditStaff={handleEditStaff}
          onSaveStaff={handleSaveStaff}
          onDeleteStaff={handleDeleteStaff}

          onMarkAttendance={handleMarkAttendance}
          onViewAttendance={handleViewAttendance}

          onAddAgency={handleAddAgency}
          onEditAgency={handleEditAgency}
          onDeleteAgency={handleDeleteAgency}
        />
      </AdminPage>

      <GuardModal
        open={isGuardModalOpen}
        guard={selectedGuard}
        onClose={() => {
          setSelectedGuard(null);
          setIsGuardModalOpen(false);
        }}
        onSave={handleSaveGuard}
      />

      <ShiftRosterModal
        open={isShiftModalOpen}
        roster={selectedShift}
        onClose={() => {
          setSelectedShift(null);
          setIsShiftModalOpen(false);
        }}
        onSave={handleSaveShift}
      />

      <ClockLogModal
        open={isClockLogModalOpen}
        log={selectedClockLog}
        onClose={() => {
          setSelectedClockLog(null);
          setIsClockLogModalOpen(false);
        }}
        onSave={handleSaveClockLog}
      />

      <DomesticStaffModal
        open={isStaffModalOpen}
        staff={selectedStaff}
        staffTypes={staffTypes}
        linkedFlats={linkedFlats}
        onClose={() => {
          setSelectedStaff(null);
          setIsStaffModalOpen(false);
        }}
        onSave={handleSaveStaff}
      />
    </>
  );
}

export default GuardsStaff;