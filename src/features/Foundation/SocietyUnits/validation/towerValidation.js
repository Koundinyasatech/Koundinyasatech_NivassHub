export const validateTower = (formData) => {
  const errors = {};

  if (!formData.towerName.trim()) {
    errors.towerName = "Tower Name is required.";
  }

  if (!formData.wings) {
    errors.wings = "Number of wings is required.";
  }

  if (!formData.floors) {
    errors.floors = "Number of floors is required.";
  }

  if (!formData.namingConvention.trim()) {
    errors.namingConvention = "Naming convention is required.";
  }

  return errors;
};