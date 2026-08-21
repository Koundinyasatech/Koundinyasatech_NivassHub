import { useState } from "react";

function useRegisterSocietyForm(onClose) {
  const [form, setForm] = useState({
    societyName: "",
    city: "",
    state: "",
    country: "",
    registrationNumber: "",
    towers: 1,
    totalUnits: 0,
    planTier: "Free trial",
    adminName: "",
    adminRole: "Committee Secretary",
    adminPhone: "",
    adminEmail: "",
  });

  const setField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const registerSociety = () => {
    console.log("Register Society:", form);

    if (onClose) {
      onClose();
    }
  };

  return {
    form,
    setField,
    registerSociety,
  };
}

export default useRegisterSocietyForm;