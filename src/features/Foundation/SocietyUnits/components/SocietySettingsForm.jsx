import Input from "../../../../components/Common/Input/Input";
import Select from "../../../../components/Common/Select/Select";
import Button from "../../../../components/Common/Button/Button";

import { penaltyOptions } from "../constants/penaltyOptions";

function SocietySettingsForm({
  formData,
  errors,
  onChange,
  onSave,
}) {
  return (
    <>
      <div className="settings-grid">

        <Input
          label="Maintenance Due Day (of Month)"
          type="number"
          value={formData.maintenanceDueDay}
          error={errors.maintenanceDueDay}
          onChange={(e) =>
            onChange("maintenanceDueDay", e.target.value)
          }
        />

        <Select
          label="Penalty Rule Type"
          value={formData.penaltyRuleType}
          options={penaltyOptions}
          error={errors.penaltyRuleType}
          onChange={(e) =>
            onChange("penaltyRuleType", e.target.value)
          }
        />

        <Input
          label="Late Fee %"
          type="number"
          value={formData.lateFee}
          error={errors.lateFee}
          onChange={(e) =>
            onChange("lateFee", e.target.value)
          }
        />

        <Input
          label="Grace Period (Days)"
          type="number"
          value={formData.gracePeriod}
          error={errors.gracePeriod}
          onChange={(e) =>
            onChange("gracePeriod", e.target.value)
          }
        />

        <div className="settings-full-width">
          <Input
            label="Notice Period (Days)"
            type="number"
            value={formData.noticePeriod}
            error={errors.noticePeriod}
            onChange={(e) =>
              onChange("noticePeriod", e.target.value)
            }
          />
        </div>

      </div>

      <div className="settings-actions">
        <Button onClick={onSave}>
          Save Settings
        </Button>
      </div>
    </>
  );
}

export default SocietySettingsForm;