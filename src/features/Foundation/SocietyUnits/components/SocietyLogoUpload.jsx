import Card from "../../../../components/Common/Card/Card";
import UploadBox from "../../../../components/Common/UploadBox/UploadBox";

function SocietyLogoUpload({
  formData,
  errors,
  handleChange,
}) {
  return (
    <Card>

      <h3 className="section-title">
        Society Logo
      </h3>

      <UploadBox
        label="Upload Society Logo"
        accept="image/*"
        value={formData.logo}
        error={errors.logo}
        onChange={(file) =>
          handleChange("logo", file)
        }
      />

      {formData.logo && (
        <div className="logo-preview">

          <img
            src={URL.createObjectURL(formData.logo)}
            alt="Society Logo"
          />

          <p>{formData.logo.name}</p>

        </div>
      )}

    </Card>
  );
}

export default SocietyLogoUpload;