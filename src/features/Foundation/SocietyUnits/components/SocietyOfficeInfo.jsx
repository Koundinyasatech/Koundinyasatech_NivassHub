import Card from "../../../../components/Common/Card/Card";
import Input from "../../../../components/Common/Input/Input";
import TextArea from "../../../../components/Common/TextArea/TextArea";

function SocietyOfficeInfo({
  formData,
  errors,
  handleChange,
}) {
  return (
    <Card>

      <h3 className="section-title">
        Office Information
      </h3>

      <div className="form-grid">

        <Input
          type="time"
          label="Office Hours Open"
          required
          value={formData.officeOpen}
          error={errors.officeOpen}
          onChange={(e) =>
            handleChange("officeOpen", e.target.value)
          }
        />

        <Input
          type="time"
          label="Office Hours Close"
          required
          value={formData.officeClose}
          error={errors.officeClose}
          onChange={(e) =>
            handleChange("officeClose", e.target.value)
          }
        />

      </div>

      <div className="form-group">

        <TextArea
          label="Bylaws Note"
          rows={5}
          placeholder="Enter Society Bylaws..."
          value={formData.bylawsNote}
          onChange={(e) =>
            handleChange("bylawsNote", e.target.value)
          }
        />

      </div>

    </Card>
  );
}

export default SocietyOfficeInfo;