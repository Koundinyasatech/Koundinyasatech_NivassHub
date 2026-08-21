import { useEffect, useState } from "react";
import { validateSocietyForm } from "../validation/societyValidation";

function createInitialState(society) {
  return {
    societyName: society?.society ?? "",
    registrationNumber: society?.registrationNumber ?? "",
    address: society
      ? `${society.city}, ${society.state}, ${society.country}`
      : "",
    officeOpen: "",
    officeClose: "",
    bylawsNote: "",
    logo: null,
  };
}

function useSocietyForm(society) {
  const [formData, setFormData] = useState(
    () => createInitialState(society)
  );

  const [errors, setErrors] = useState({});

  /*
   * When the selected society changes,
   * load that society's information into the form.
   */
  useEffect(() => {
    setFormData(createInitialState(society));
    setErrors({});
  }, [society?.id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
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

  const resetForm = () => {
    setFormData(createInitialState(society));
    setErrors({});
  };

  const handleSubmit = () => {
    const validationErrors =
      validateSocietyForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = new FormData();

    Object.entries(formData).forEach(
      ([key, value]) => {
        payload.append(key, value);
      }
    );

    console.log("Form Submitted");

    for (const pair of payload.entries()) {
      console.log(pair[0], pair[1]);
    }

    // API Call Later
    // await createSociety(payload);
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

export default useSocietyForm;