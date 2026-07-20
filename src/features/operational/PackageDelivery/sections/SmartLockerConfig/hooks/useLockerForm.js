import { useEffect, useState } from "react";

function useLockerForm(
  locker,
  onSave,
  onClose
) {
  const [form, setForm] = useState({
    id: null,
    lockerBank: "",
    totalSlots: "",
    occupiedSlots: 0,
    otpExpiry: "24 hrs",
    status: "Active",
  });

  useEffect(() => {
    if (locker) {
      setForm(locker);
    } else {
      setForm({
        id: null,
        lockerBank: "",
        totalSlots: "",
        occupiedSlots: 0,
        otpExpiry: "24 hrs",
        status: "Active",
      });
    }
  }, [locker]);

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

export default useLockerForm;