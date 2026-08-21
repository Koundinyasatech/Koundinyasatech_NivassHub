import { useEffect, useState } from "react";

function useGuardForm(
  guard,
  onSave,
  onClose
) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    mobile: "",
    gate: "",
    shift: "",
    agency: "",
    idProof: "Pending",
    status: "Active",
    joiningDate: "",
    address: "",
  });

  useEffect(() => {
    if (guard) {
      setForm(guard);
    } else {
      setForm({
        id: null,
        name: "",
        mobile: "",
        gate: "",
        shift: "",
        agency: "",
        idProof: "Pending",
        status: "Active",
        joiningDate: "",
        address: "",
      });
    }
  }, [guard]);

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

export default useGuardForm;