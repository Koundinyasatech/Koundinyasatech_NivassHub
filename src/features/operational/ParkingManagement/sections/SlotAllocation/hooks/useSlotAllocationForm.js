import { useEffect, useState } from "react";

const initialForm = {
  slot: "",
  effectiveDate: "",
};

function useSlotAllocationForm(
  allocation,
  onSave,
  onClose
) {
  const [form, setForm] =
    useState(initialForm);

  useEffect(() => {
    if (allocation) {
      setForm({
        id: allocation.id,
        unit: allocation.unit,
        type: allocation.type,
        status: "Active",
        slot: allocation.slot,
        allocatedOn:
          allocation.allocatedOn,
        effectiveDate: "",
      });
    } else {
      setForm(initialForm);
    }
  }, [allocation]);

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
      allocatedOn:
        form.effectiveDate ||
        form.allocatedOn,
    });

    onClose();
  };

  return {
    form,
    setField,
    save,
  };
}

export default useSlotAllocationForm;