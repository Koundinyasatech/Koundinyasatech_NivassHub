export function validateClockLog(form) {
  const errors = {};

  if (!form.guard?.trim()) {
    errors.guard = "Guard name is required.";
  }

  if (!form.date) {
    errors.date = "Date is required.";
  }

  if (!form.clockIn) {
    errors.clockIn = "Clock In time is required.";
  }

  if (!form.clockOut) {
    errors.clockOut = "Clock Out time is required.";
  }

  if (!form.hours) {
    errors.hours = "Working hours are required.";
  }

  if (!form.flag) {
    errors.flag = "Attendance flag is required.";
  }

  return {
    isValid:
      Object.keys(errors).length === 0,
    errors,
  };
}