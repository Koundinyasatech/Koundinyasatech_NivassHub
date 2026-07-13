import Card from "../../../../components/Common/Card/Card";
import Input from "../../../../components/Common/Input/Input";
import TextArea from "../../../../components/Common/TextArea/TextArea";

function SocietyBasicInfo({
  formData,
  errors,
  handleChange,
}) {
  return (
    <Card>

      <h3 className="section-title">Society Profile</h3>

      <div className="form-grid">

        <Input
          label="Society Name"
          required
          placeholder="Enter Society Name"
          value={formData.societyName}
          error={errors.societyName}
          onChange={(e) =>
            handleChange("societyName", e.target.value)
          }
        />

        <Input
          label="Registration Number"
          required
          placeholder="Enter Registration Number"
          value={formData.registrationNumber}
          error={errors.registrationNumber}
          onChange={(e) =>
            handleChange("registrationNumber", e.target.value)
          }
        />

      </div>

      <div className="form-group">

        <TextArea
          label="Address"
          required
          rows={4}
          placeholder="Enter Society Address"
          value={formData.address}
          error={errors.address}
          onChange={(e) =>
            handleChange("address", e.target.value)
          }
        />

      </div>

    </Card>
  );
}

export default SocietyBasicInfo;