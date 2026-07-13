import Modal from "../Modal/Modal";
import Button from "../Button/Button";

function ConfirmDialog({
  isOpen,
  open,
  title = "Confirmation",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  const visible = isOpen ?? open;

  return (
    <Modal
      isOpen={visible}
      onClose={onCancel}
      title={title}
      width="450px"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}

export default ConfirmDialog;