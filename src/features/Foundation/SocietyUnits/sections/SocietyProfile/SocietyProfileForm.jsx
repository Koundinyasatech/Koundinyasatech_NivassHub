import "./SocietyProfileForm.css";

import Button from "../../../../../components/Common/Button/Button";

import SocietyBasicInfo from "../../components/SocietyBasicInfo";
import SocietyLogoUpload from "../../components/SocietyLogoUpload";
import SocietyOfficeInfo from "../../components/SocietyOfficeInfo";

import useSocietyForm from "../../hooks/useSocietyForm";

function SocietyProfileForm({ currentSociety }) {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  } = useSocietyForm(currentSociety);

  return (
    <div className="society-profile-form">

      <SocietyBasicInfo
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <SocietyLogoUpload
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <SocietyOfficeInfo
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <div className="form-footer">

        <Button
          variant="secondary"
          onClick={resetForm}
        >
          Discard
        </Button>

        <Button
          onClick={handleSubmit}
        >
          Save Changes
        </Button>

      </div>

    </div>
  );
}

export default SocietyProfileForm;