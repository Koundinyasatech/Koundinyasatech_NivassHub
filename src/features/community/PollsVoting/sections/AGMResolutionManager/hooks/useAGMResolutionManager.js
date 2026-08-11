import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getAGMResolutions,
  updateAGMResolution,
} from "../services/agmResolutionService";

function useAGMResolutionManager() {
  const [resolutions, setResolutions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchResolutions =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAGMResolutions();

        setResolutions(
          Array.isArray(response)
            ? response
            : []
        );
      } catch (err) {
        console.error(
          "Failed to fetch AGM resolutions:",
          err
        );

        setError(
          "Failed to load AGM resolutions."
        );

        setResolutions([]);
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchResolutions();
  }, [fetchResolutions]);

  const updateResolution =
    useCallback(
      async (resolutionId, payload) => {
        try {
          await updateAGMResolution(
            resolutionId,
            payload
          );

          await fetchResolutions();

          return true;
        } catch (err) {
          console.error(
            "Failed to update AGM resolution:",
            err
          );

          setError(
            "Failed to update AGM resolution."
          );

          return false;
        }
      },
      [fetchResolutions]
    );

  return {
    resolutions,
    loading,
    error,
    fetchResolutions,
    updateResolution,
  };
}

export default useAGMResolutionManager;