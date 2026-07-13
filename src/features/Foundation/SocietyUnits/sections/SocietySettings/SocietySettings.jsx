import Card from "../../../../../components/Common/Card/Card";

import SocietySettingsForm from "../../components/SocietySettingsForm";
import useSocietySettingsForm from "../../hooks/useSocietySettingsForm";
import { societySettingsDummyData } from "../../data/societySettingsDummyData";

import "./SocietySettings.css";
import "./SocietySettings.css";

function SocietySettings() {
  const {
    formData,
    errors,
    handleChange,
    validate,
  } = useSocietySettingsForm(
    societySettingsDummyData
  );

  const handleSave = () => {
    if (!validate()) return;

    console.log("Society Settings", formData);

    // API Integration
    // await updateSocietySettings(formData);
  };

  return (
    <Card>
      <SocietySettingsForm
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
      />
    </Card>
  );
}

export default SocietySettings;