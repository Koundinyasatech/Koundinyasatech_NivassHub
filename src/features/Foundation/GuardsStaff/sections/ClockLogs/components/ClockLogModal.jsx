import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import Button from "../../../../../../components/Common/Button/Button";

import useClockLogForm from "../hooks/useClockLogForm";

function ClockLogModal({
  open,
  log,
  onClose,
  onSave,
}) {
  const {
    form,
    setField,
    save,
  } = useClockLogForm(
    log,
    onSave,
    onClose
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        log
          ? "Edit Clock Log"
          : "Add Clock Log"
      }
    >
      <div className="modal-body">

        <div className="form-group">
          <label>Guard</label>

          <Input
            value={form.guard}
            onChange={(e) =>
              setField(
                "guard",
                e.target.value
              )
            }
            placeholder="Guard Name"
          />
        </div>

        <div className="form-group">
          <label>Date</label>

          <Input
            type="date"
            value={form.date}
            onChange={(e) =>
              setField(
                "date",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>Clock In</label>

          <Input
            type="time"
            value={form.clockIn}
            onChange={(e) =>
              setField(
                "clockIn",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>Clock Out</label>

          <Input
            type="time"
            value={form.clockOut}
            onChange={(e) =>
              setField(
                "clockOut",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>Hours</label>

          <Input
            value={form.hours}
            onChange={(e) =>
              setField(
                "hours",
                e.target.value
              )
            }
            placeholder="Working Hours"
          />
        </div>

        <div className="form-group">
          <label>Flag</label>

          <Select
            value={form.flag}
            onChange={(e) =>
              setField(
                "flag",
                e.target.value
              )
            }
          >
            <option value="OK">
              OK
            </option>

            <option value="Late">
              Late
            </option>

            <option value="Absent">
              Absent
            </option>

            <option value="Week Off">
              Week Off
            </option>
          </Select>
        </div>

        <div className="form-group">
          <label>Remarks</label>

          <Input
            value={form.remarks}
            onChange={(e) =>
              setField(
                "remarks",
                e.target.value
              )
            }
            placeholder="Remarks"
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
          {log
            ? "Update"
            : "Save"}
        </Button>

      </div>
    </Modal>
  );
}

export default ClockLogModal;