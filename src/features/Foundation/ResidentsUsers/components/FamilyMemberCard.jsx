import Card from "../../../../components/Common/Card/Card";
import StatusBadge from "../../../../components/Common/StatusBadge/StatusBadge";
import "./FamilyMemberCard.css";
function FamilyMemberCard({ family }) {
  return (
    <Card className="family-card">
      <div className="family-card-header">
        <div>
          <h2>{family.unit}</h2>
          <p>
            Emergency Contact : {family.emergencyContact}
          </p>
        </div>

        <div className="record-count">
          {family.members.length} family members
        </div>
      </div>

      <div className="family-member-list">
        {family.members.map((member) => (
          <div
            key={member.id}
            className="family-member-row"
          >
            <div className="family-member-left">
              <div className="family-avatar">
                {member.name.charAt(0)}
              </div>

              <div>
                <h4>{member.name}</h4>
                <p>{member.relation}</p>
              </div>
            </div>

            <StatusBadge
              status={member.category}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default FamilyMemberCard;