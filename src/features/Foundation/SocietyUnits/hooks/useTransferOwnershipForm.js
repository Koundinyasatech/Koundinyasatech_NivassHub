import { useEffect, useState } from "react";

const initialState = {
  currentOwner: "",
  newOwner: "",
  transferDate: "",
  notes: "",
};

function useTransferOwnershipForm(record) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (record) {
      setFormData({
        currentOwner: record.owner,
        newOwner: "",
        transferDate: "",
        notes: "",
      });
    } else {
      setFormData(initialState);
    }

    setErrors({});
  }, [record]);

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

    if (!formData.newOwner.trim()) {
      newErrors.newOwner = "New owner is required";
    }

    if (!formData.transferDate) {
      newErrors.transferDate = "Transfer date is required";
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
  };
}

export default useTransferOwnershipForm;