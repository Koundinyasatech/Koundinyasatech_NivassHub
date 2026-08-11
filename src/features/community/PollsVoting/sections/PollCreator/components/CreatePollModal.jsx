// CreatePollModal.jsx

import { useState } from "react";

import Modal from "../../../../../../components/Common/Modal/Modal";
import Button from "../../../../../../components/Common/Button/Button";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import TextArea from "../../../../../../components/Common/TextArea/TextArea";

function CreatePollModal({
  open,
  onClose,
}) {
  const [form, setForm] = useState({
    question: "",
    type: "",
    audience: "",
    closesOn: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Poll"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button>
            Publish Poll
          </Button>
        </>
      }
    >
      <TextArea
        label="Question"
        value={form.question}
        onChange={(e) =>
          handleChange("question", e.target.value)
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <Select
          label="Type"
          value={form.type}
          onChange={(e) =>
            handleChange("type", e.target.value)
          }
          options={[
            {
              label: "Single Choice",
              value: "single",
            },
            {
              label: "Multiple Choice",
              value: "multiple",
            },
          ]}
        />

        <Select
          label="Audience"
          value={form.audience}
          onChange={(e) =>
            handleChange("audience", e.target.value)
          }
          options={[
            {
              label: "All Residents",
              value: "all",
            },
            {
              label: "Committee",
              value: "committee",
            },
          ]}
        />
      </div>

      <Input
        label="Closes On"
        type="date"
        value={form.closesOn}
        onChange={(e) =>
          handleChange("closesOn", e.target.value)
        }
      />
    </Modal>
  );
}

export default CreatePollModal;