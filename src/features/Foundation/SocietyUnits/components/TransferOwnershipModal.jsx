import Modal from "../../../../components/Common/Modal/Modal";
import Button from "../../../../components/Common/Button/Button";

import TransferOwnershipForm from "./TransferOwnershipForm";

import useTransferOwnershipForm from "../hooks/useTransferOwnershipForm";

function TransferOwnershipModal({
  open,
  record,
  onClose,
  onSave,
}) {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  } = useTransferOwnershipForm(record);

  const handleSave = () => {
    if (!handleSubmit()) return;

    onSave(formData);
    resetForm();
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="Transfer Ownership"
      width="700px"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
          >
            Transfer Ownership
          </Button>
        </>
      }
    >
      <TransferOwnershipForm
        record={record}
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />
    </Modal>
  );
}

export default TransferOwnershipModal;