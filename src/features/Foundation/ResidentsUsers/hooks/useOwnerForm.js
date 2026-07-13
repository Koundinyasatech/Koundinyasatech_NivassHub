import { useEffect, useState } from "react";

function useOwnerForm(owner) {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (owner) {
      setFormData({
        phone: owner.phone || "",
        email: owner.email || "",
        status: owner.status || "",
      });
    } else {
      setFormData({
        phone: "",
        email: "",
        status: "",
      });
    }

    setErrors({});
  }, [owner]);

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

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.status.trim()) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
  };
}

export default useOwnerForm;