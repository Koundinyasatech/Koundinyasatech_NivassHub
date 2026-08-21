export const normalizeCommitteeElectionStatus = (
  status
) => {
  if (!status) {
    return "Pending";
  }

  return String(status).trim();
};

export const getCommitteeElectionStatusClass = (
  status
) => {
  return normalizeCommitteeElectionStatus(status)
    .toLowerCase()
    .replace(/\s+/g, "-");
};