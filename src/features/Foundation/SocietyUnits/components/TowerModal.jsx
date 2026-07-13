import { useEffect } from "react";

import Modal from "../../../../components/Common/Modal/Modal";
import Button from "../../../../components/Common/Button/Button";

import TowerForm from "./TowerForm";
import useTowerForm from "../hooks/useTowerForm";

function TowerModal({
    open,
    onClose,
    tower = null,
    onSave,
}) {
    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
    } = useTowerForm();

    useEffect(() => {
        if (!open) return;

        if (tower) {
            handleChange("towerName", tower.tower);
            handleChange("wings", tower.wings);
            handleChange("floors", tower.floors);
            handleChange("namingConvention", tower.namingConvention);
        } else {
            resetForm();
        }
    }, [open, tower]);

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
            title={tower ? "Edit Tower" : "Add Tower"}
            width="650px"
        >
            <TowerForm
                formData={formData}
                errors={errors}
                onChange={handleChange}
            />

            <div className="modal-footer">
                <Button
                    variant="secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>

                <Button onClick={handleSaveClick}>
                    {tower ? "Update Tower" : "Save Tower"}
                </Button>
            </div>
        </Modal>
    );
}

export default TowerModal;