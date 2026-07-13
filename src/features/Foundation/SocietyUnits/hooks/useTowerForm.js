import { useState } from "react";
import { validateTower } from "../validation/towerValidation";

const initialState = {
  towerName: "",
  wings: "",
  floors: "",
  namingConvention: "",
};

function useTowerForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  const handleSubmit = () => {
    const validationErrors = validateTower(formData);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return false;
    }

    console.log("Tower Data:", formData);

    // API Later

    return true;
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

export default useTowerForm;