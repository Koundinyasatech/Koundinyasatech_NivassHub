import { useEffect, useState } from "react";

import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import Button from "../../../../../../components/Common/Button/Button";

function EditVideoIntercomModal({
  open,
  data,
  onClose,
}) {
  const [formData, setFormData] = useState({
    unit: "",
    guardPost: "",
    callRouting: "",
    retention: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        unit: data.unit || "",
        guardPost: data.guardPost || "",
        callRouting: data.callRouting || "",
        retention: data.retention || "",
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Data:", formData);

    // Later you can update table data here

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
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Edit ${formData.unit}`}
      footer={footer}
      width="700px"
    >
      <Input
        label="Unit"
        value={formData.unit}
        onChange={(e) =>
          handleChange("unit", e.target.value)
        }
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Input
          label="Paired Guard Post"
          value={formData.guardPost}
          onChange={(e) =>
            handleChange(
              "guardPost",
              e.target.value
            )
          }
        />

        <Select
          label="Retention"
          value={formData.retention}
          options={[
            { label: "15d", value: "15d" },
            { label: "30d", value: "30d" },
            { label: "60d", value: "60d" },
          ]}
          onChange={(e) =>
            handleChange(
              "retention",
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
          label="Call Routing"
          value={formData.callRouting}
          onChange={(e) =>
            handleChange(
              "callRouting",
              e.target.value
            )
          }
        />
      </div>
    </Modal>
  );
}

export default EditVideoIntercomModal;