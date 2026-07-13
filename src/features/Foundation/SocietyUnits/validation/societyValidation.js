export const validateSocietyForm = (formData) => {
  const errors = {};

  if (!formData.societyName.trim()) {
    errors.societyName = "Society Name is required.";
  }

  if (!formData.registrationNumber.trim()) {
    errors.registrationNumber = "Registration Number is required.";
  }

  if (!formData.address.trim()) {
    errors.address = "Address is required.";
  }

  if (!formData.officeOpen) {
    errors.officeOpen = "Office opening time is required.";
  }

  if (!formData.officeClose) {
    errors.officeClose = "Office closing time is required.";
  }

  if (formData.logo) {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(formData.logo.type)) {
      errors.logo = "Only PNG, JPG, JPEG and WEBP files are allowed.";
    }

    if (formData.logo.size > 2 * 1024 * 1024) {
      errors.logo = "Maximum file size is 2 MB.";
    }
  }

  return errors;
};