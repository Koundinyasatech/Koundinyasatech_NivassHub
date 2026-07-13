import { useState } from "react";
import { validateSocietyForm } from "../validation/societyValidation";

function useSocietyForm() {
  const initialState = {
    societyName: "",
    registrationNumber: "",
    address: "",
    officeOpen: "",
    officeClose: "",
    bylawsNote: "",
    logo: null,
  };

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
    const validationErrors = validateSocietyForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    console.log("Form Submitted");

    for (const pair of payload.entries()) {
      console.log(pair[0], pair[1]);
    }

    // API Call Later
    // await createSociety(payload);
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

export default useSocietyForm;