import { useState } from "react";

import {
  initialCommitteeElections,
} from "../data/committeeElections";

function useCommitteeElection() {
  const [elections, setElections] = useState(
    initialCommitteeElections
  );

  const addElection = (election) => {
    setElections((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...election,
      },
    ]);
  };

  const updateElection = (id, updates) => {
    setElections((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
            }
          : item
      )
    );
  };

  const approveElection = (id) => {
    updateElection(id, {
      status: "Approved",
    });
  };

  const rejectElection = (id) => {
    updateElection(id, {
      status: "Rejected",
    });
  };

  return {
    elections,
    setElections,
    addElection,
    updateElection,
    approveElection,
    rejectElection,
  };
}

export default useCommitteeElection;