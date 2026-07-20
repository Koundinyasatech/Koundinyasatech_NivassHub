import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Button from "../../../../../../components/Common/Button/Button";
import ToggleSwitch from "../../../../../../components/Common/ToggleSwitch/ToggleSwitch";

import useLockerForm from "../hooks/useLockerForm";

function SmartLockerModal({
  open,
  locker,
  onClose,
  onSave,
}) {
  const {
    form,
    setField,
    save,
  } = useLockerForm(
    locker,
    onSave,
    onClose
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        locker
          ? "Edit Locker Bank"
          : "Add Locker Bank"
      }
    >
      <div className="modal-body">

        <div className="form-group">
          <label>Locker Bank Name</label>

          <Input
            value={form.lockerBank}
            onChange={(e) =>
              setField(
                "lockerBank",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-grid">

          <div className="form-group">
            <label>Total Slots</label>

            <Input
              type="number"
              value={form.totalSlots}
              onChange={(e) =>
                setField(
                  "totalSlots",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>OTP Expiry (Hours)</label>

            <Input
              type="number"
              value={form.otpExpiry}
              onChange={(e) =>
                setField(
                  "otpExpiry",
                  e.target.value
                )
              }
            />
          </div>

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
              checked={
                form.status === "Active"
              }
              onChange={(checked) =>
                setField(
                  "status",
                  checked
                    ? "Active"
                    : "Disabled"
                )
              }
            />

            <span>Bank Active</span>
          </label>
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
          {locker
            ? "Save Changes"
            : "Add Bank"}
        </Button>

      </div>
    </Modal>
  );
}

export default SmartLockerModal;