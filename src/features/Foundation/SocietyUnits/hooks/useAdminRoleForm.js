import { useEffect, useState } from "react";

function useAdminRoleForm(role) {
  const [formData, setFormData] = useState({
    user: "",
    role: "",
    scope: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (role) {
      setFormData({
        user: role.user,
        role: role.role,
        scope: role.scope,
      });
    } else {
      setFormData({
        user: "",
        role: "",
        scope: "",
      });
    }
  }, [role]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.user)
      newErrors.user = "User is required";

    if (!formData.role)
      newErrors.role = "Role is required";

    if (!formData.scope)
      newErrors.scope = "Scope is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
  };
}

export default useAdminRoleForm;