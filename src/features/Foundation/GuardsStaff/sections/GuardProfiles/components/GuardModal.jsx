import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import Button from "../../../../../../components/Common/Button/Button";

import useGuardForm from "../hooks/useGuardForm";
function GuardModal({
  open,
  guard,
  onClose,
  onSave,
}) {
  const {
    form,
    setField,
    save,
  } = useGuardForm(
    guard,
    onSave,
    onClose
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        guard
          ? "Edit Guard"
          : "Onboard Guard"
      }
    >
      <div className="modal-body">

        <div className="form-group">
          <label>Guard Name</label>

          <Input
            value={form.name}
            onChange={(e) =>
              setField(
                "name",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>

          <Input
            value={form.mobile}
            onChange={(e) =>
              setField(
                "mobile",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>Assigned Gate</label>

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

            <option value="Pedestrian Gate">
              Pedestrian Gate
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

            <option value="Day (8am–8pm)">
              Day (8am–8pm)
            </option>

            <option value="Night (8pm–8am)">
              Night (8pm–8am)
            </option>
          </Select>
        </div>

        <div className="form-group">
          <label>Agency</label>

          <Input
            value={form.agency}
            onChange={(e) =>
              setField(
                "agency",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>ID Proof</label>

          <Select
            value={form.idProof}
            onChange={(e) =>
              setField(
                "idProof",
                e.target.value
              )
            }
          >
            <option value="Verified">
              Verified
            </option>

            <option value="Pending">
              Pending
            </option>
          </Select>
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
            <option value="Active">
              Active
            </option>

            <option value="Off-boarded">
              Off-boarded
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
          Save
        </Button>

      </div>
    </Modal>
  );
}

export default GuardModal;