import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import Button from "../../../../../../components/Common/Button/Button";

import useVisitorParkingForm from "../hooks/useVisitorParkingForm";
import { visitorSlotOptions } from "../data/visitorParkingDummyData";

function VisitorParkingModal({
  open,
  pass,
  onClose,
  onSave,
}) {
  const {
    form,
    setField,
    save,
  } = useVisitorParkingForm(
    pass,
    onSave,
    onClose
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Issue Visitor Parking Pass"
    >
      <div className="modal-body">

        <div className="form-grid">

          <div className="form-group">
            <label>Slot</label>

            <Select
              value={form.slot}
              onChange={(value) =>
                setField("slot", value)
              }
              options={visitorSlotOptions}
              placeholder="Select Slot"
            />
          </div>

          <div className="form-group">
            <label>Visiting Unit</label>

            <Input
              value={form.unit}
              onChange={(e) =>
                setField(
                  "unit",
                  e.target.value
                )
              }
            />
          </div>

        </div>

        <div className="form-group">
          <label>Visitor / Vehicle</label>

          <Input
            value={form.visitor}
            onChange={(e) =>
              setField(
                "visitor",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>Valid Until</label>

          <Input
            value={form.validUntil}
            placeholder="e.g. 2026-07-09 21:00"
            onChange={(e) =>
              setField(
                "validUntil",
                e.target.value
              )
            }
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
          Issue Pass
        </Button>

      </div>
    </Modal>
  );
}

export default VisitorParkingModal;