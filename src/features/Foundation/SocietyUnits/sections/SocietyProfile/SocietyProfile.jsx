import Card from "../../../../../components/Common/Card/Card";
import SocietyProfileForm from "./SocietyProfileForm";

import "./SocietyProfile.css";

function SocietyProfile({ currentSociety }) {
  return (
    <div className="society-profile-page">
      <Card>
        <SocietyProfileForm
          currentSociety={currentSociety}
        />
      </Card>
    </div>
  );
}

export default SocietyProfile;