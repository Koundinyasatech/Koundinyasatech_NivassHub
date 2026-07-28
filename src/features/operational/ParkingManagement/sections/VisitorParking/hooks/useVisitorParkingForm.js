import { useEffect, useState } from "react";

const initialForm = {
  slot: "",
  unit: "",
  visitor: "",
  validUntil: "",
};

function useVisitorParkingForm(
  pass,
  onSave,
  onClose
) {
  const [form, setForm] =
    useState(initialForm);

  useEffect(() => {
    if (pass) {
      setForm({
        ...pass,
      });
    } else {
      setForm(initialForm);
    }
  }, [pass]);

  const setField = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const save = () => {
    onSave({
      ...form,
      status: "Occupied",
    });

    onClose();
  };

  return {
    form,
    setField,
    save,
  };
}

export default useVisitorParkingForm;