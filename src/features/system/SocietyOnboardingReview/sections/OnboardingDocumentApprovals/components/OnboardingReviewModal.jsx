import { useEffect, useState } from "react";

import Modal from "../../../../../../components/Common/Modal/Modal";
import Button from "../../../../../../components/Common/Button/Button";
import Card from "../../../../../../components/Common/Card/Card";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import TextArea from "../../../../../../components/Common/TextArea/TextArea";

function OnboardingReviewModal({
  isOpen,
  record,
  onClose,
  onApprove,
  onReject,
}) {
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    setRemarks(record?.remarks || "");
  }, [record]);

  if (!record) {
    return null;
  }

  const handleApprove = () => {
    onApprove({
      ...record,
      remarks,
      status: "Verified",
    });
  };

  const handleReject = () => {
    onReject({
      ...record,
      remarks,
      status: "Rejected",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Review Onboarding Document"
      width="650px"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleReject}>
            Reject
          </Button>

          <Button onClick={handleApprove}>
            Approve
          </Button>
        </>
      }
    >
      <div className="two-column-grid">
        <div>
          <strong>Society</strong>
          <p>{record.societyName}</p>
        </div>

        <div>
          <strong>Society Code</strong>
          <p>{record.societyCode}</p>
        </div>

        <div>
          <strong>Document Type</strong>
          <p>{record.documentType}</p>
        </div>

        <div>
          <strong>Submitted Date</strong>
          <p>{record.submittedDate}</p>
        </div>
      </div>

      <div className="form-group">
        <strong>Current Status</strong>

        <div>
          <StatusBadge status={record.status} />
        </div>
      </div>

      <div className="form-group">
        <strong>Document Preview</strong>

        <Card>
          <p>
            Document preview placeholder —{" "}
            {record.fileName ||
              `${record.documentType}.pdf`}
          </p>
        </Card>
      </div>

      <div className="form-group">
        <TextArea
          label="Remarks (Visible to the Society Admin)"
          name="remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Enter remarks..."
          rows={4}
        />
      </div>
    </Modal>
  );
}

export default OnboardingReviewModal;