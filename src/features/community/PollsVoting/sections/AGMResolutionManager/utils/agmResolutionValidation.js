export const validateAGMResolution = (
  values = {}
) => {
  const errors = {};

  if (
    !values.resolution ||
    !String(values.resolution).trim()
  ) {
    errors.resolution =
      "Resolution is required.";
  }

  if (
    !values.quorumRequired ||
    !String(
      values.quorumRequired
    ).trim()
  ) {
    errors.quorumRequired =
      "Quorum required is required.";
  }

  if (
    !values.date ||
    !String(values.date).trim()
  ) {
    errors.date =
      "Date is required.";
  }

  return errors;
};

export const isAGMResolutionValid = (
  values = {}
) => {
  return (
    Object.keys(
      validateAGMResolution(values)
    ).length === 0
  );
};