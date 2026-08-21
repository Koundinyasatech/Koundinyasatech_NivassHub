const committeeElectionService = {
  async getNominations() {
    return [];
  },

  async createNomination(payload) {
    return payload;
  },

  async updateNomination(id, payload) {
    return {
      id,
      ...payload,
    };
  },

  async approveNomination(id) {
    return {
      id,
      status: "Approved",
    };
  },

  async rejectNomination(id) {
    return {
      id,
      status: "Rejected",
    };
  },
};

export default committeeElectionService;