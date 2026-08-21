import { useEffect, useState } from "react";

import Modal from "../../../../../../components/Common/Modal/Modal";
import Button from "../../../../../../components/Common/Button/Button";
import Input from "../../../../../../components/Common/Input/Input";

function CommitteeElectionModal({
  open,
  election,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    candidate: "",
    unit: "",
    position: "",
    nominated: "",
    status: "Pending",
  });

  useEffect(() => {
    if (!open) return;

    if (election) {
      setFormData({
        candidate: election.candidate || "",
        unit: election.unit || "",
        position: election.position || "",
        nominated: election.nominated || "",
        status: election.status || "Pending",
      });
    } else {
      setFormData({
        candidate: "",
        unit: "",
        position: "",
        nominated: "",
        status: "Pending",
      });
    }
  }, [election, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave?.(formData);
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={
        election
          ? "View nomination"
          : "Add nomination"
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
            form="committee-election-form"
          >
            {election
              ? "Save changes"
              : "Add nomination"}
          </Button>
        </>
      }
    >
      <form
        id="committee-election-form"
        onSubmit={handleSubmit}
      >
        <Input
          label="CANDIDATE"
          name="candidate"
          value={formData.candidate}
          onChange={handleChange}
          placeholder="Enter candidate name"
        />

        <Input
          label="UNIT"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="Enter unit"
        />

        <Input
          label="POSITION CONTESTING FOR"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Enter position"
        />

        <Input
          label="NOMINATED"
          name="nominated"
          type="date"
          value={formData.nominated}
          onChange={handleChange}
        />

        <div>
          <label>STATUS</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>
        </div>
      </form>
    </Modal>
  );
}

export default CommitteeElectionModal;