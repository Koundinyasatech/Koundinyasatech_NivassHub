import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import Button from "../../../../../../components/Common/Button/Button";

import { staffStatusOptions } from "../constants/staffStatusOptions";

import useDomesticStaffForm from "../hooks/useDomesticStaffForm";

function DomesticStaffModal({
  open,
  staff,
  staffTypes,
  linkedFlats,
  onClose,
  onSave,
}) {
  const {
    form,
    setField,
    save,
  } = useDomesticStaffForm(
    staff,
    onSave,
    onClose
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        staff
          ? "Edit Domestic Staff"
          : "Add Domestic Staff"
      }
    >
      <div className="modal-body">

        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) =>
            setField(
              "name",
              e.target.value
            )
          }
        />

        <Input
          label="Mobile Number"
          value={form.mobile}
          onChange={(e) =>
            setField(
              "mobile",
              e.target.value
            )
          }
        />

        <Select
          label="Staff Type"
          value={form.type}
          options={staffTypes}
          onChange={(value) =>
            setField("type", value)
          }
        />

        <Select
          label="Linked Flat"
          value={form.linkedFlats}
          options={linkedFlats}
          onChange={(value) =>
            setField(
              "linkedFlats",
              value
            )
          }
        />

        <Input
          label="Aadhaar / ID Number"
          value={form.idNumber}
          onChange={(e) =>
            setField(
              "idNumber",
              e.target.value
            )
          }
        />

        <Input
          label="Address"
          value={form.address}
          onChange={(e) =>
            setField(
              "address",
              e.target.value
            )
          }
        />

        <Select
          label="Status"
          value={form.status}
          options={staffStatusOptions}
          onChange={(value) =>
            setField(
              "status",
              value
            )
          }
        />

      </div>

      <div className="modal-footer">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button onClick={save}>
          {staff
            ? "Update"
            : "Save"}
        </Button>
      </div>
    </Modal>
  );
}

export default DomesticStaffModal;