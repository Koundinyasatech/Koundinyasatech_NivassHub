import { useState } from "react";

const initialState = {
  tower: "",
  unitNumber: "",
  floor: "",
  type: "",
  area: "",
  status: "",
};

function useUnitForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.tower.trim()) {
      newErrors.tower = "Tower is required";
    }

    if (!formData.unitNumber.trim()) {
      newErrors.unitNumber = "Unit Number is required";
    }

    if (!formData.floor) {
      newErrors.floor = "Floor is required";
    }

    if (!formData.type) {
      newErrors.type = "Unit Type is required";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => validate();

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
  };
}

export default useUnitForm;