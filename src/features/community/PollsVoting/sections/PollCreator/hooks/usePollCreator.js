import {
  useEffect,
  useState,
} from "react";

import {
  getPolls,
} from "../services/pollCreatorService";

function usePollCreator() {
  const [polls, setPolls] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadPolls =
    async () => {
      try {
        setLoading(true);

        const response =
          await getPolls();

        setPolls(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadPolls();
  }, []);

  return {
    polls,
    loading,
    refreshPolls:
      loadPolls,
    setPolls,
  };
}

export default usePollCreator;