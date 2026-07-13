import { useEffect, useState } from "react";

function useMoveProcessForm(
  request,
  onSave,
  onComplete
) {
  const [form, setForm] = useState({
    stage: "",
    remarks: "",
  });

  useEffect(() => {
    if (request) {
      setForm({
        stage: request.stage,
        remarks: request.remarks || "",
      });
    }
  }, [request]);

  const setField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const save = () => {
    onSave({
      ...request,
      ...form,
    });
  };

  const complete = () => {
    onComplete({
      ...request,
      ...form,
      stage: "Completed",
    });
  };

  return {
    form,
    setField,
    save,
    complete,
  };
}

export default useMoveProcessForm;