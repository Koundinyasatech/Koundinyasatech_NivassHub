import Card from "../../../../../components/Common/Card/Card";
import SocietyProfileForm from "./SocietyProfileForm";

import "./SocietyProfile.css";

function SocietyProfile() {
  return (
    <div className="society-profile-page">
      <Card>
        <SocietyProfileForm />
      </Card>
    </div>
  );
}

export default SocietyProfile;