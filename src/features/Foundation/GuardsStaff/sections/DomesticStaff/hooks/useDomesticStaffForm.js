import { useEffect, useState } from "react";

import { validateDomesticStaff } from "../utils/domesticStaffValidation";

const initialForm = {
  name: "",
  mobile: "",
  type: "",
  linkedFlats: "",
  idNumber: "",
  address: "",
  status: "Active",
};

function useDomesticStaffForm(
  staff,
  onSave,
  onClose
) {
  const [form, setForm] =
    useState(initialForm);

  const [errors, setErrors] =
    useState({});

  useEffect(() => {
    if (staff) {
      setForm({
        ...initialForm,
        ...staff,
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [staff]);

  const setField = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
  };

  const save = () => {
    const validationErrors =
      validateDomesticStaff(form);

    if (
      Object.keys(validationErrors)
        .length
    ) {
      setErrors(validationErrors);
      return;
    }

    onSave(form);

    reset();

    onClose();
  };

  return {
    form,
    errors,
    setField,
    save,
    reset,
  };
}

export default useDomesticStaffForm;