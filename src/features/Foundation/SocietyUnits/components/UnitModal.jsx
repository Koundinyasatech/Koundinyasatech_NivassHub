import { useEffect } from "react";

import Modal from "../../../../components/Common/Modal/Modal";
import Button from "../../../../components/Common/Button/Button";

import UnitForm from "./UnitForm";
import useUnitForm from "../hooks/useUnitForm";

function UnitModal({
  open,
  onClose,
  unit = null,
  towerOptions = [],
  onSave,
}) {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
  } = useUnitForm();

  useEffect(() => {
    if (!open) return;

    if (unit) {
      setFormData({
        tower: unit.tower,
        unitNumber: unit.unitNumber,
        floor: unit.floor,
        type: unit.type,
        area: unit.area,
        status: unit.status,
      });
    } else {
      resetForm();
    }
  }, [open, unit]);

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSaveClick = () => {
    const isValid = handleSubmit();

    if (!isValid) return;

    onSave(formData);

    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleCancel}
      title={unit ? "Edit Unit" : "Add Unit"}
      width="700px"
    >
      <UnitForm
        formData={formData}
        errors={errors}
        onChange={handleChange}
        towerOptions={towerOptions}
      />

      <div className="modal-footer">
        <Button
          variant="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button onClick={handleSaveClick}>
          {unit ? "Update Unit" : "Save Unit"}
        </Button>
      </div>
    </Modal>
  );
}

export default UnitModal;