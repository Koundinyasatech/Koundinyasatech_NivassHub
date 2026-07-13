import { useEffect } from "react";

import Input from "../../../../components/Common/Input/Input";
import TextArea from "../../../../components/Common/TextArea/TextArea";

function TransferOwnershipForm({
  record,
  formData,
  errors,
  onChange,
}) {
  useEffect(() => {
    if (!record) return;

    onChange("currentOwner", record.owner);
  }, [record]);

  return (
    <div className="form-grid">
      <Input
        label="Current Owner"
        value={formData.currentOwner}
        disabled
      />

      <Input
        label="New Owner"
        placeholder="Enter new owner name"
        value={formData.newOwner}
        error={errors.newOwner}
        onChange={(e) =>
          onChange("newOwner", e.target.value)
        }
        required
      />

      <Input
        label="Transfer Date"
        type="date"
        value={formData.transferDate}
        error={errors.transferDate}
        onChange={(e) =>
          onChange("transferDate", e.target.value)
        }
        required
      />

      <TextArea
        label="Notes"
        placeholder="Enter transfer notes..."
        rows={4}
        value={formData.notes}
        error={errors.notes}
        onChange={(e) =>
          onChange("notes", e.target.value)
        }
      />
    </div>
  );
}

export default TransferOwnershipForm;