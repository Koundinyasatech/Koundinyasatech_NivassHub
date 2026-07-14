import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import Button from "../../../../../../components/Common/Button/Button";

import useShiftRosterForm from "../hooks/useShiftRosterForm";

function ShiftRosterModal({
  open,
  roster,
  onClose,
  onSave,
}) {
  const {
    form,
    setField,
    save,
  } = useShiftRosterForm(
    roster,
    onSave,
    onClose
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        roster
          ? "Edit Shift Assignment"
          : "Assign Shift"
      }
    >
      <div className="modal-body">

        <div className="form-group">
          <label>Guard Name</label>

          <Input
            value={form.guardName}
            onChange={(e) =>
              setField(
                "guardName",
                e.target.value
              )
            }
            placeholder="Enter guard name"
          />
        </div>

        <div className="form-group">
          <label>Gate</label>

          <Select
            value={form.gate}
            onChange={(e) =>
              setField(
                "gate",
                e.target.value
              )
            }
          >
            <option value="">
              Select Gate
            </option>

            <option value="Main Gate">
              Main Gate
            </option>

            <option value="Rear Gate">
              Rear Gate
            </option>

            <option value="Tower Gate">
              Tower Gate
            </option>

            <option value="Service Gate">
              Service Gate
            </option>
          </Select>
        </div>

        <div className="form-group">
          <label>Shift</label>

          <Select
            value={form.shift}
            onChange={(e) =>
              setField(
                "shift",
                e.target.value
              )
            }
          >
            <option value="">
              Select Shift
            </option>

            <option value="Morning">
              Morning
            </option>

            <option value="Evening">
              Evening
            </option>

            <option value="Night">
              Night
            </option>
          </Select>
        </div>

        <div className="form-group">
          <label>Day</label>

          <Select
            value={form.day}
            onChange={(e) =>
              setField(
                "day",
                e.target.value
              )
            }
          >
            <option value="">
              Select Day
            </option>

            <option value="Monday">
              Monday
            </option>

            <option value="Tuesday">
              Tuesday
            </option>

            <option value="Wednesday">
              Wednesday
            </option>

            <option value="Thursday">
              Thursday
            </option>

            <option value="Friday">
              Friday
            </option>

            <option value="Saturday">
              Saturday
            </option>

            <option value="Sunday">
              Sunday
            </option>
          </Select>
        </div>

        <div className="form-group">
          <label>Start Time</label>

          <Input
            type="time"
            value={form.startTime}
            onChange={(e) =>
              setField(
                "startTime",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>End Time</label>

          <Input
            type="time"
            value={form.endTime}
            onChange={(e) =>
              setField(
                "endTime",
                e.target.value
              )
            }
          />
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
          >
            <option value="Assigned">
              Assigned
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>
          </Select>
        </div>

      </div>

      <div className="modal-footer">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          onClick={save}
        >
          {roster
            ? "Update Shift"
            : "Assign Shift"}
        </Button>
      </div>
    </Modal>
  );
}

export default ShiftRosterModal;