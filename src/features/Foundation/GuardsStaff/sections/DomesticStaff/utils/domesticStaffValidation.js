export function validateDomesticStaff(form) {
  const errors = {};

  // =====================================================
  // Name
  // =====================================================

  if (!form.name.trim()) {
    errors.name = "Full Name is required.";
  }

  // =====================================================
  // Mobile
  // =====================================================

  if (!form.mobile.trim()) {
    errors.mobile = "Mobile Number is required.";
  } else if (!/^\d{10}$/.test(form.mobile)) {
    errors.mobile =
      "Enter a valid 10-digit mobile number.";
  }

  // =====================================================
  // Staff Type
  // =====================================================

  if (!form.type) {
    errors.type = "Staff Type is required.";
  }

  // =====================================================
  // Linked Flat
  // =====================================================

  if (!form.linkedFlats) {
    errors.linkedFlats =
      "Linked Flat is required.";
  }

  // =====================================================
  // ID Number
  // =====================================================

  if (!form.idNumber.trim()) {
    errors.idNumber =
      "ID Number is required.";
  }

  // =====================================================
  // Address
  // =====================================================

  if (!form.address.trim()) {
    errors.address =
      "Address is required.";
  }

  // =====================================================
  // Status
  // =====================================================

  if (!form.status) {
    errors.status = "Status is required.";
  }

  return errors;
}