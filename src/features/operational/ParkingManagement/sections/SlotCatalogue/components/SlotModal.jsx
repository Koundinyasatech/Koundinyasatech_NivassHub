import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import Button from "../../../../../../components/Common/Button/Button";

import useSlotForm from "../hooks/useSlotForm";

function SlotModal({
  open,
  slot,
  onClose,
  onSave,
}) {
  const {
    form,
    setField,
    save,
  } = useSlotForm(
    slot,
    onSave,
    onClose
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        slot
          ? "Edit Slot"
          : "Add Slot"
      }
    >
      <div className="modal-body">

        <div className="form-group">
          <label>Slot Number</label>

          <Input
            value={form.slotNumber}
            onChange={(e) =>
              setField(
                "slotNumber",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-grid">

          <div className="form-group">
            <label>Level</label>

            <Select
              value={form.level}
              onChange={(e) =>
                setField(
                  "level",
                  e.target.value
                )
              }
              options={[
                {
                  label: "Basement 1",
                  value: "Basement 1",
                },
                {
                  label: "Basement 2",
                  value: "Basement 2",
                },
              ]}
            />
          </div>

          <div className="form-group">
            <label>Type</label>

            <Select
              value={form.type}
              onChange={(e) =>
                setField(
                  "type",
                  e.target.value
                )
              }
              options={[
                {
                  label: "4W",
                  value: "4W",
                },
                {
                  label: "2W",
                  value: "2W",
                },
                {
                  label: "Visitor",
                  value: "Visitor",
                },
              ]}
            />
          </div>

        </div>

        <div className="form-group">
          <label>Status</label>

          <Select
            value={form.status}
            onChange={(e) =>
              setField(
                "status",
                e.target.value
              )
            }
            options={[
              {
                label: "Free",
                value: "Free",
              },
              {
                label: "Allocated",
                value: "Allocated",
              },
              {
                label: "Occupied",
                value: "Occupied",
              },
            ]}
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
          {slot
            ? "Save Changes"
            : "Add Slot"}
        </Button>

      </div>
    </Modal>
  );
}

export default SlotModal;