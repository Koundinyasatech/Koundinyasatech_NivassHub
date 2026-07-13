import { useEffect, useState } from "react";

import Modal from "../../../../components/Common/Modal/Modal";
import Button from "../../../../components/Common/Button/Button";
import TextArea from "../../../../components/Common/TextArea/TextArea";

function KYCReviewDrawer({
  open,
  record,
  onClose,
  onApprove,
  onReject,
}) {
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (record) {
      setRemarks(record.remarks || "");
    }
  }, [record]);

  if (!record) return null;

  const handleApprove = () => {
    onApprove({
      ...record,
      remarks,
    });
  };

  const handleReject = () => {
    onReject({
      ...record,
      remarks,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Review KYC — ${record.resident}`}
      size="lg"
    >
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <strong>Document:</strong>
          <span>{record.document}</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <strong>Submitted:</strong>
          <span>{record.submitted}</span>
        </div>

        <div
          style={{
            border: "1px dashed #d9d9d9",
            borderRadius: "8px",
            height: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span>
            Document Preview Placeholder
          </span>
        </div>

        <TextArea
          label="Remarks (Visible to Resident)"
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
          rows={4}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          {record.status === "Pending" && (
            <>
              <Button
                variant="danger"
                onClick={handleReject}
              >
                Reject
              </Button>

              <Button
                onClick={handleApprove}
              >
                Approve
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default KYCReviewDrawer;