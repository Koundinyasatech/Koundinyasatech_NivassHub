import { useEffect, useState } from "react";

import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import Button from "../../../../../../components/Common/Button/Button";

function EditBarrierModal({
  open,
  data,
  onClose,
  onSave,
  mode = "edit",
}) {
  const [formData, setFormData] = useState({
    barrier: "",
    gate: "",
    trigger: "",
    deviceId: "",
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData({
        barrier: data.barrier || "",
        gate: data.gate || "",
        trigger: data.trigger || "",
        deviceId: data.deviceId || "",
      });
    }

    if (mode === "add") {
      setFormData({
        barrier: "",
        gate: "Main Gate",
        trigger: "RFID",
        deviceId: "",
      });
    }
  }, [data, mode]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData);
    }

    onClose();
  };

  const footer = (
    <>
      <Button
        variant="secondary"
        onClick={onClose}
      >
        Cancel
      </Button>

      <Button
        variant="primary"
        onClick={handleSubmit}
      >
        {mode === "edit"
          ? "Save Changes"
          : "Add Barrier"}
      </Button>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        mode === "edit"
          ? `Edit ${formData.barrier}`
          : "Add Barrier"
      }
      footer={footer}
      width="700px"
    >
      <Input
        label="Barrier Name"
        value={formData.barrier}
        onChange={(e) =>
          handleChange(
            "barrier",
            e.target.value
          )
        }
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Select
          label="Gate"
          value={formData.gate}
          options={[
            {
              label: "Main Gate",
              value: "Main Gate",
            },
            {
              label: "Rear Gate",
              value: "Rear Gate",
            },
          ]}
          onChange={(e) =>
            handleChange(
              "gate",
              e.target.value
            )
          }
        />

        <Select
          label="Trigger"
          value={formData.trigger}
          options={[
            {
              label: "RFID",
              value: "RFID",
            },
            {
              label: "RFID + QR",
              value: "RFID + QR",
            },
          ]}
          onChange={(e) =>
            handleChange(
              "trigger",
              e.target.value
            )
          }
        />
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <Input
          label="Device ID"
          value={formData.deviceId}
          onChange={(e) =>
            handleChange(
              "deviceId",
              e.target.value
            )
          }
        />
      </div>
    </Modal>
  );
}

export default EditBarrierModal;