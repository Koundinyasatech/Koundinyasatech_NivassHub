import { useState } from "react";

import AdminPage from "../../../../components/Common/AdminPage/AdminPage";
import Button from "../../../../components/Common/Button/Button";

import { pollTabs } from "../constants/pollTabs";

import PollCreator from "../sections/PollCreator/PollCreator";
import AGMResolutionManager from "../sections/AGMResolutionManager/AGMResolutionManager";
import CommitteeElectionSetup from "../sections/CommitteeElectionSetup/CommitteeElectionSetup";
import LiveTallyDashboard from "../sections/LiveTallyDashboard/LiveTallyDashboard";
import ResultArchival from "../sections/ResultArchival/ResultArchival";
import VoterParticipationReport from "../sections/VoterParticipationReport/VoterParticipationReport";

import CreatePollModal from "../sections/PollCreator/components/CreatePollModal";

function PollsVoting() {
  const [activeTab, setActiveTab] =
    useState("pollCreator");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const renderSection = () => {
    switch (activeTab) {
      case "pollCreator":
        return <PollCreator />;

      case "agmResolutionManager":
        return <AGMResolutionManager />;

      case "committeeElectionSetup":
        return <CommitteeElectionSetup />;

      case "liveTallyDashboard":
        return <LiveTallyDashboard />;

      case "resultArchival":
        return <ResultArchival />;

      case "voterParticipationReport":
        return <VoterParticipationReport />;

      default:
        return <PollCreator />;
    }
  };

  const activeTabLabel =
    pollTabs.find(
      (tab) => tab.id === activeTab
    )?.label || "Poll Creator";

  return (
    <>
      <AdminPage
        breadcrumb={[
          "Community",
          "Polls & Voting",
        ]}
        title={activeTabLabel}
        action={
          activeTab === "pollCreator" ? (
            <Button
              onClick={() =>
                setShowCreateModal(true)
              }
            >
              + Create Poll
            </Button>
          ) : null
        }
        tabs={pollTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {renderSection()}
      </AdminPage>

      {activeTab === "pollCreator" && (
        <CreatePollModal
          open={showCreateModal}
          onClose={() =>
            setShowCreateModal(false)
          }
        />
      )}
    </>
  );
}

export default PollsVoting;