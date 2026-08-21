export function validateLocker(form) {
  const errors = {};

  if (!form.lockerBank.trim()) {
    errors.lockerBank =
      "Locker bank name is required.";
  }

  if (!form.totalSlots) {
    errors.totalSlots =
      "Total slots are required.";
  }

  if (!form.otpExpiry.trim()) {
    errors.otpExpiry =
      "OTP expiry is required.";
  }

  return errors;
}