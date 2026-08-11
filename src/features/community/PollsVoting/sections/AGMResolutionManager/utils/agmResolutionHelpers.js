export const normalizeAGMResolution = (
  resolution = {}
) => {
  return {
    id:
      resolution.id ??
      resolution.agm_resolution_id ??
      resolution.resolutionId,

    resolution:
      resolution.resolution ??
      resolution.title ??
      "",

    quorumRequired:
      resolution.quorumRequired ??
      resolution.quorum_required ??
      "",

    quorumMet:
      resolution.quorumMet ??
      resolution.quorum_met ??
      "",

    date:
      resolution.date ??
      resolution.resolution_date ??
      "",

    status:
      resolution.status ?? "",
  };
};

export const filterAGMResolutions = (
  resolutions = [],
  search = ""
) => {
  const keyword = search
    .trim()
    .toLowerCase();

  if (!keyword) {
    return resolutions;
  }

  return resolutions.filter(
    (item) =>
      String(
        item.resolution ?? ""
      )
        .toLowerCase()
        .includes(keyword) ||
      String(
        item.quorumRequired ?? ""
      )
        .toLowerCase()
        .includes(keyword) ||
      String(
        item.quorumMet ?? ""
      )
        .toLowerCase()
        .includes(keyword) ||
      String(
        item.date ?? ""
      )
        .toLowerCase()
        .includes(keyword) ||
      String(
        item.status ?? ""
      )
        .toLowerCase()
        .includes(keyword)
  );
};