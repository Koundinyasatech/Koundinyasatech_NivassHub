export const getClockLogs = (clockLogs) => {
  return [...clockLogs];
};

export const addClockLog = (
  clockLogs,
  newLog
) => {
  return [
    ...clockLogs,
    {
      ...newLog,
      id: Date.now(),
    },
  ];
};

export const updateClockLog = (
  clockLogs,
  updatedLog
) => {
  return clockLogs.map((log) =>
    log.id === updatedLog.id
      ? updatedLog
      : log
  );
};

export const deleteClockLog = (
  clockLogs,
  id
) => {
  return clockLogs.filter(
    (log) => log.id !== id
  );
};

export const getClockLogById = (
  clockLogs,
  id
) => {
  return (
    clockLogs.find(
      (log) => log.id === id
    ) || null
  );
};