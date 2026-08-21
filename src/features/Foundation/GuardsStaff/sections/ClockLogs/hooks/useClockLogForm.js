import { useEffect, useState } from "react";

const initialForm = {
  id: null,
  guard: "",
  date: "",
  clockIn: "",
  clockOut: "",
  hours: "",
  flag: "OK",
  remarks: "",
};

function useClockLogForm(
  log,
  onSave,
  onClose
) {
  const [form, setForm] =
    useState(initialForm);

  useEffect(() => {
    if (log) {
      setForm({
        id: log.id,
        guard: log.guard || "",
        date: log.date || "",
        clockIn: log.clockIn || "",
        clockOut: log.clockOut || "",
        hours: log.hours || "",
        flag: log.flag || "OK",
        remarks: log.remarks || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [log]);

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

export default useClockLogForm;