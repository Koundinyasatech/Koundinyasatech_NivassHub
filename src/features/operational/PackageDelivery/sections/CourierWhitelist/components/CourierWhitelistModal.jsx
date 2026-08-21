import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Button from "../../../../../../components/Common/Button/Button";
import ToggleSwitch from "../../../../../../components/Common/ToggleSwitch/ToggleSwitch";

import useCourierForm from "../hooks/useCourierForm";

function CourierWhitelistModal({
  open,
  courier,
  onClose,
  onSave,
}) {
  const {
    form,
    setField,
    save,
  } = useCourierForm(
    courier,
    onSave,
    onClose
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        courier
          ? "Edit Courier"
          : "Add Courier"
      }
    >
      <div className="modal-body">

        <div className="form-group">
          <label>Courier / Delivery Partner</label>

          <Input
            value={form.courier}
            onChange={(e) =>
              setField(
                "courier",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
          >
            <ToggleSwitch
              checked={form.skipCall === "Yes"}
              onChange={(checked) =>
                setField(
                  "skipCall",
                  checked ? "Yes" : "No"
                )
              }
            />

            <span>
              Skip resident call workflow
            </span>
          </label>
        </div>

        <div className="form-group">
          <label>Notes</label>

          <textarea
            value={form.notes}
            onChange={(e) =>
              setField(
                "notes",
                e.target.value
              )
            }
            rows={5}
            className="common-textarea"
          />
        </div>

      </div>

      <div className="modal-footer">

        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button onClick={save}>
          {courier ? "Save" : "Add"}
        </Button>

      </div>
    </Modal>
  );
}

export default CourierWhitelistModal;