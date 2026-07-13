import { useEffect, useState } from "react";

function useSocietySettingsForm(initialData) {
  const [formData, setFormData] = useState({
    maintenanceDueDay: "",
    penaltyRuleType: "",
    lateFee: "",
    gracePeriod: "",
    noticePeriod: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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

    if (!formData.maintenanceDueDay)
      newErrors.maintenanceDueDay = "Required";

    if (!formData.penaltyRuleType)
      newErrors.penaltyRuleType = "Required";

    if (!formData.gracePeriod)
      newErrors.gracePeriod = "Required";

    if (!formData.noticePeriod)
      newErrors.noticePeriod = "Required";

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

export default useSocietySettingsForm;