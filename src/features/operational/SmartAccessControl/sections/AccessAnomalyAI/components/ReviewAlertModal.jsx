import Modal from "../../../../../../components/Common/Modal/Modal";
import Button from "../../../../../../components/Common/Button/Button";

function ReviewAlertModal({
  open,
  data,
  onClose,
  onMarkReviewed,
}) {
  if (!data) return null;

  const footer = (
    <>
      <Button
        variant="secondary"
        onClick={onClose}
      >
        Close
      </Button>

      <Button
        variant="primary"
        onClick={() => onMarkReviewed(data)}
      >
        Mark Reviewed
      </Button>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={data.type}
      footer={footer}
      width="650px"
    >
      <p
        style={{
          fontSize: "18px",
          marginBottom: "20px",
        }}
      >
        {data.detail}
      </p>

      <p style={{ color: "#666" }}>
        Detected {data.detected}
      </p>
    </Modal>
  );
}

export default ReviewAlertModal;