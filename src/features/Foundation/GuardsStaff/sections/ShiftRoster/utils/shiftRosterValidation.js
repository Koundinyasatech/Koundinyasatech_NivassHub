export function validateShiftRoster(
  form
) {
  const errors = {};

  if (!form.guardName.trim()) {
    errors.guardName =
      "Guard name is required.";
  }

  if (!form.gate.trim()) {
    errors.gate =
      "Gate is required.";
  }

  if (!form.shift.trim()) {
    errors.shift =
      "Shift is required.";
  }

  if (!form.day.trim()) {
    errors.day =
      "Day is required.";
  }

  if (!form.startTime) {
    errors.startTime =
      "Start time is required.";
  }

  if (!form.endTime) {
    errors.endTime =
      "End time is required.";
  }

  return errors;
}