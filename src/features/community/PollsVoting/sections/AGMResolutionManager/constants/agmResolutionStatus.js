export const getAGMStatusVariant = (status = "") => {
  const normalizedStatus = status
    .toLowerCase()
    .trim();

  if (normalizedStatus === "passed") {
    return "passed";
  }

  if (
    normalizedStatus === "pending re-vote" ||
    normalizedStatus === "pending"
  ) {
    return "pending";
  }

  if (normalizedStatus === "failed") {
    return "failed";
  }

  return "default";
};