import { agmResolutionData } from "../data/agmResolutionData";

export const getAGMResolutions = async () => {
  /*
   * Replace this mock implementation with the actual API call
   * when the backend endpoint is available.
   *
   * Example:
   *
   * return api.get("/api/admin/agm/resolutions");
   */

  return Promise.resolve(agmResolutionData);
};

export const updateAGMResolution = async (
  resolutionId,
  payload
) => {
  /*
   * Replace with API integration later.
   *
   * Example:
   *
   * return api.patch(
   *   `/api/admin/agm/resolutions/${resolutionId}`,
   *   payload
   * );
   */

  console.log(
    "Update AGM Resolution:",
    resolutionId,
    payload
  );

  return Promise.resolve({
    id: resolutionId,
    ...payload,
  });
};