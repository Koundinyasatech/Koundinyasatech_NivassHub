export const validatePoll = (
  values
) => {
  const errors = {};

  if (!values.question) {
    errors.question =
      "Question is required";
  }

  if (!values.type) {
    errors.type =
      "Poll type is required";
  }

  if (!values.audience) {
    errors.audience =
      "Audience is required";
  }

  return errors;
};