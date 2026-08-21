import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import Button from "../../../../../../components/Common/Button/Button";

import useSlotAllocationForm from "../hooks/useSlotAllocationForm";
import { slotOptions } from "../data/slotAllocationDummyData";

function SlotAllocationModal({
  open,
  allocation,
  onClose,
  onSave,
}) {
  const {
    form,
    setField,
    save,
  } = useSlotAllocationForm(
    allocation,
    onSave,
    onClose
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        allocation
          ? `Allocate / Transfer - ${allocation.unit}`
          : "Allocate / Transfer"
      }
    >
      <div className="modal-body">

        <div className="form-group">
          <label>Slot</label>

          <Select
  value={form.slot}
  onChange={(value) =>
    setField("slot", value)
  }
  options={slotOptions}
  placeholder="Select Slot"
/>
        </div>

        <div className="form-group">
          <label>Effective Date</label>

          <Input
            type="date"
            value={form.effectiveDate}
            onChange={(e) =>
              setField(
                "effectiveDate",
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
          Confirm
        </Button>

      </div>
    </Modal>
  );
}

export default SlotAllocationModal;