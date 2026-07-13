import Modal from "../../../../components/Common/Modal/Modal";
import Button from "../../../../components/Common/Button/Button";

import AdminRoleForm from "./AdminRoleForm";

import useAdminRoleForm from "../hooks/useAdminRoleForm";

function AdminRoleModal({
  open,
  role,
  onClose,
  onSave,
}) {
  const {
    formData,
    errors,
    handleChange,
    validate,
  } = useAdminRoleForm(role);

  const handleSubmit = () => {
    if (!validate()) return;

    onSave(formData);
  };

  return (
    <Modal
      open={open}
      title={
        role
          ? "Edit Role Assignment"
          : "Assign Admin Role"
      }
      onClose={onClose}
      width="650px"
    >
      <AdminRoleForm
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />

      <div className="modal-footer">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button onClick={handleSubmit}>
          {role ? "Update" : "Assign"}
        </Button>
      </div>
    </Modal>
  );
}

export default AdminRoleModal;