import Modal from "../../../../components/Common/Modal/Modal";
import Button from "../../../../components/Common/Button/Button";
import Input from "../../../../components/Common/Input/Input";
import TextArea from "../../../../components/Common/TextArea/TextArea";
import Select from "../../../../components/Common/Select/Select";

import useMoveProcessForm from "../hooks/useMoveProcessForm";

function MoveProcessDrawer({
  open,
  request,
  onClose,
  onSave,
  onComplete,
}) {
  const {
    form,
    setField,
    save,
    complete,
  } = useMoveProcessForm(
    request,
    onSave,
    onComplete
  );

  if (!request) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${request.type} Process`}
    >
      <div className="form-grid">

        <Input
          label="Resident"
          value={request.resident}
          disabled
        />

        <Input
          label="Unit"
          value={request.unit}
          disabled
        />

        <Input
          label="Request Type"
          value={request.type}
          disabled
        />

        <Input
          label="Requested Date"
          value={request.date}
          disabled
        />

        <Select
          label="Current Stage"
          value={form.stage}
          onChange={(e) =>
            setField("stage", e.target.value)
          }
        >
          <option value="Initiated">
            Initiated
          </option>

          <option value="Documents Verified">
            Documents Verified
          </option>

          <option value="Owner Approved">
            Owner Approved
          </option>

          <option value="NOC Generated">
            NOC Generated
          </option>

          <option value="Access Granted">
            Access Granted
          </option>

          <option value="Completed">
            Completed
          </option>
        </Select>

        <TextArea
          label="Remarks"
          rows={4}
          value={form.remarks}
          onChange={(e) =>
            setField("remarks", e.target.value)
          }
        />

      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="secondary"
          onClick={save}
        >
          Save Progress
        </Button>

        <Button
          onClick={complete}
        >
          Complete
        </Button>
      </div>
    </Modal>
  );
}

export default MoveProcessDrawer;