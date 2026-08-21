import { useEffect, useState } from "react";

function useCourierForm(
  courier,
  onSave,
  onClose
) {
  const [form, setForm] = useState({
    id: null,
    courier: "",
    skipCall: "No",
    notes: "",
  });

  useEffect(() => {
    if (courier) {
      setForm(courier);
    } else {
      setForm({
        id: null,
        courier: "",
        skipCall: "No",
        notes: "",
      });
    }
  }, [courier]);

  const setField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const save = () => {
    onSave(form);

    if (onClose) {
      onClose();
    }
  };

  return {
    form,
    setField,
    save,
  };
}

export default useCourierForm;