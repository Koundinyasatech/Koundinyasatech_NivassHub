import { useEffect, useState } from "react";

const initialForm = {
  slotNumber: "",
  level: "Basement 1",
  type: "4W",
  status: "Free",
};

function useSlotForm(
  slot,
  onSave,
  onClose
) {
  const [form, setForm] =
    useState(initialForm);

  useEffect(() => {
    if (slot) {
      setForm(slot);
    } else {
      setForm(initialForm);
    }
  }, [slot]);

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
    onSave(form);
    onClose();
  };

  return {
    form,
    setField,
    save,
  };
}

export default useSlotForm;