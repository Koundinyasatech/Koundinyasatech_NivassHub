import Card from "../../../../../../components/Common/Card/Card";
import Button from "../../../../../../components/Common/Button/Button";

function VehicleRequestCard({
  unit,
  onApprove,
  onReject,
}) {
  return (
    <Card>
      <div className="tower-toolbar">
        <h3>{unit.unit}</h3>

        <div className="record-count">
          {unit.pending
            ? "Additional vehicle request pending"
            : "No pending requests"}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>
          {unit.vehicles.map((vehicle, index) => (
            <span key={index}>
              {index + 1}. {vehicle}
              {index < unit.vehicles.length - 1
                ? ", "
                : ""}
            </span>
          ))}
        </p>

        {unit.pending && (
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "20px",
  }}
>
  <Button
    style={{ width: "auto" }}
    onClick={onApprove}
  >
    Approve
  </Button>

  <Button
    variant="text"
    style={{ width: "auto" }}
    onClick={onReject}
  >
    Reject
  </Button>
</div>
        )}
      </div>
    </Card>
  );
}

export default VehicleRequestCard;