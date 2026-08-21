import { useEffect, useState } from "react";

import Modal from "../../../../../../components/Common/Modal/Modal";
import Button from "../../../../../../components/Common/Button/Button";
import Input from "../../../../../../components/Common/Input/Input";

function AGMResolutionModal({
  open,
  resolution,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    resolution: "",
    quorumRequired: "51%",
    quorumMet: "0%",
    status: "Pending re-vote",
  });

  useEffect(() => {
    if (!open) return;

    if (resolution) {
      setFormData({
        resolution: resolution.resolution || "",
        quorumRequired:
          resolution.quorumRequired || "51%",
        quorumMet:
          resolution.quorumMet || "0%",
        status:
          resolution.status || "Pending re-vote",
      });
    } else {
      setFormData({
        resolution: "",
        quorumRequired: "51%",
        quorumMet: "0%",
        status: "Pending re-vote",
      });
    }
  }, [resolution, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.resolution.trim()) {
      return;
    }

    if (onSave) {
      onSave({
        ...formData,
        id: resolution?.id,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={
        resolution
          ? "Edit resolution"
          : "Draft resolution"
      }
      width="560px"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="agm-resolution-form"
          >
            {resolution
              ? "Save changes"
              : "Add resolution"}
          </Button>
        </>
      }
    >
      <form
        id="agm-resolution-form"
        onSubmit={handleSubmit}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            RESOLUTION TEXT
          </label>

          <textarea
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
            placeholder="Enter resolution text"
            rows={4}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              resize: "vertical",
              fontFamily: "inherit",
              fontSize: "14px",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <Input
            label="QUORUM REQUIRED"
            name="quorumRequired"
            value={formData.quorumRequired}
            onChange={handleChange}
            placeholder="51%"
            required
          />

          <Input
            label="QUORUM MET"
            name="quorumMet"
            value={formData.quorumMet}
            onChange={handleChange}
            placeholder="0%"
            required
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            STATUS
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--white)",
              fontSize: "14px",
            }}
          >
            <option value="Pending re-vote">
              Pending re-vote
            </option>

            <option value="Passed">
              Passed
            </option>

            <option value="Failed">
              Failed
            </option>

            <option value="Draft">
              Draft
            </option>
          </select>
        </div>
      </form>
    </Modal>
  );
}

export default AGMResolutionModal;