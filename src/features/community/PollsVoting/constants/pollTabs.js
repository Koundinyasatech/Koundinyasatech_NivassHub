import PollCreator from "../sections/PollCreator/PollCreator";
import AGMResolutionManager from "../sections/AGMResolutionManager/AGMResolutionManager";
import CommitteeElectionSetup from "../sections/CommitteeElectionSetup/CommitteeElectionSetup";
import LiveTallyDashboard from "../sections/LiveTallyDashboard/LiveTallyDashboard";
import ResultArchival from "../sections/ResultArchival/ResultArchival";
import VoterParticipationReport from "../sections/VoterParticipationReport/VoterParticipationReport";

export const pollTabs = [
  {
    id: "pollCreator",
    label: "Poll Creator",
    component: PollCreator,
  },
  {
    id: "agmResolutionManager",
    label: "AGM Resolution Manager",
    component: AGMResolutionManager,
  },
  {
    id: "committeeElectionSetup",
    label: "Committee Election Setup",
    component: CommitteeElectionSetup,
  },
  {
    id: "liveTallyDashboard",
    label: "Live Tally Dashboard",
    component: LiveTallyDashboard,
  },
  {
    id: "resultArchival",
    label: "Result Archival",
    component: ResultArchival,
  },
  {
    id: "voterParticipationReport",
    label: "Voter Participation Report",
    component: VoterParticipationReport,
  },
];