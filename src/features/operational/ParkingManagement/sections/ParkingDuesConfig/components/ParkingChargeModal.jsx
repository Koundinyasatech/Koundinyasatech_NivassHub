import { useEffect, useState } from "react";
import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Button from "../../../../../../components/Common/Button/Button";

function ParkingChargeModal({
  open,
  onClose,
  selectedCharge,
  setCharges,
}) {
  const [charge, setCharge] = useState("");

  useEffect(() => {
    if (selectedCharge) {
      setCharge(selectedCharge.monthlyCharge);
    }
  }, [selectedCharge]);

  const handleSave = () => {
    setCharges((prev) =>
      prev.map((item) =>
        item.id === selectedCharge.id
          ? {
              ...item,
              monthlyCharge: Number(charge),
            }
          : item
      )
    );

    onClose();
  };

  if (!selectedCharge) return null;

  return (
    <Modal
      open={open}
      title={`Set charge — ${selectedCharge.slotType}`}
      onClose={onClose}
    >
      <div className="form-group">
        <label className="section-title">
          MONTHLY CHARGE (₹)
        </label>

        <Input
          value={charge}
          onChange={(e) =>
            setCharge(e.target.value)
          }
          placeholder="Enter monthly charge"
        />
      </div>

      <div className="modal-footer">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
}

export default ParkingChargeModal;