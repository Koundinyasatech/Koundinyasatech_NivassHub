import { useEffect, useState } from "react";

import Modal from "../../../../../../components/Common/Modal/Modal";
import Button from "../../../../../../components/Common/Button/Button";
import Input from "../../../../../../components/Common/Input/Input";

function AGMResolutionModal({
  open,
  resolution,
  onClose,
}) {
  const [formData, setFormData] = useState({
    resolution: "",
    quorumRequired: "51%",
    quorumMet: "0%",
    status: "Pending re-vote",
  });

  useEffect(() => {
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

    console.log(
      resolution
        ? "Updating resolution:"
        : "Creating resolution:",
      formData
    );

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
      width="530px"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
          >
            {resolution
              ? "Save changes"
              : "Add resolution"}
          </Button>
        </>
      }
    >
      <form
        className="agm-resolution-form"
        onSubmit={handleSubmit}
      >
        <div className="agm-form-group">
          <label className="agm-form-label">
            RESOLUTION TEXT
          </label>

          <textarea
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
            className="agm-resolution-textarea"
            placeholder="Enter resolution text"
            rows={4}
          />
        </div>

        <div className="agm-form-row">
          <Input
            label="QUORUM REQUIRED"
            name="quorumRequired"
            value={formData.quorumRequired}
            onChange={handleChange}
            placeholder="51%"
          />

          <Input
            label="QUORUM MET"
            name="quorumMet"
            value={formData.quorumMet}
            onChange={handleChange}
            placeholder="0%"
          />
        </div>

        <div className="agm-form-group">
          <label className="agm-form-label">
            STATUS
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="agm-form-select"
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