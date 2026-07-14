export function validateGuard(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Guard name is required.";
  }

  if (!form.mobile.trim()) {
    errors.mobile = "Mobile number is required.";
  }

  if (!form.gate.trim()) {
    errors.gate = "Gate is required.";
  }

  if (!form.shift.trim()) {
    errors.shift = "Shift is required.";
  }

  if (!form.agency.trim()) {
    errors.agency = "Agency is required.";
  }

  return errors;
}