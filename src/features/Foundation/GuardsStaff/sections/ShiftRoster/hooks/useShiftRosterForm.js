import { useEffect, useState } from "react";

function useShiftRosterForm(
  roster,
  onSave,
  onClose
) {
  const [form, setForm] = useState({
    id: null,
    guardName: "",
    gate: "",
    shift: "",
    day: "",
    startTime: "",
    endTime: "",
    status: "Assigned",
  });

  useEffect(() => {
    if (roster) {
      setForm(roster);
    } else {
      setForm({
        id: null,
        guardName: "",
        gate: "",
        shift: "",
        day: "",
        startTime: "",
        endTime: "",
        status: "Assigned",
      });
    }
  }, [roster]);

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

export default useShiftRosterForm;