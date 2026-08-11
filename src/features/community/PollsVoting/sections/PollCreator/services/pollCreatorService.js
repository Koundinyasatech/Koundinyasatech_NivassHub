import { pollCreatorData } from "../data/pollCreatorData";

export const getPolls = async () => {
  return Promise.resolve(pollCreatorData);
};

export const getPollById = async (id) => {
  return Promise.resolve(
    pollCreatorData.find(
      (poll) => poll.id === id
    )
  );
};

export const createPoll = async (payload) => {
  console.log("Create Poll", payload);

  return Promise.resolve(payload);
};

export const updatePoll = async (
  id,
  payload
) => {
  console.log(
    "Update Poll",
    id,
    payload
  );

  return Promise.resolve(payload);
};

export const closePoll = async (id) => {
  console.log(
    "Close Poll",
    id
  );

  return Promise.resolve(id);
};

export const deletePoll = async (id) => {
  console.log(
    "Delete Poll",
    id
  );

  return Promise.resolve(id);
};