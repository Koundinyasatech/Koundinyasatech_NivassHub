import Button from "../../../../components/Common/Button/Button";
import Modal from "../../../../components/Common/Modal/Modal";

import OwnerProfile from "./OwnerProfile";

import useOwnerForm from "../hooks/useOwnerForm";

function OwnerDrawer({
  open,
  owner,
  onClose,
  onSave,
}) {
  const {
    formData,
    errors,
    handleChange,
    validate,
  } = useOwnerForm(owner);

  const handleSubmit = () => {
    if (!validate()) return;

    onSave({
      ...owner,
      ...formData,
    });
  };

  return (
    <Modal
      open={open}
      title={owner?.name || "Owner Details"}
      onClose={onClose}
      width="650px"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>

          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </>
      }
    >
      <OwnerProfile
        owner={owner}
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />
    </Modal>
  );
}

export default OwnerDrawer;