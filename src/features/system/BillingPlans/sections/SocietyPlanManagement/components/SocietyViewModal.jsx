import Drawer from "../../../../../../components/Common/Drawer/Drawer";
import Card from "../../../../../../components/Common/Card/Card";
import Button from "../../../../../../components/Common/Button/Button";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";

function SocietyViewModal({
  society,
  onClose,
  onChangePlan,
  onOpenWorkspace,
}) {
  if (!society) {
    return null;
  }

  const collectionRate =
    society.collectionRate ?? society.collection ?? null;

  const occupancy =
    society.occupancy ?? null;

  return (
    <Drawer
  isOpen={Boolean(society)}
      onClose={onClose}
      title="Society details"
      width="630px"
      footer={
        <>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            variant="outline"
            onClick={() => onChangePlan(society)}
          >
            Change plan
          </Button>

          <Button
            onClick={() => onOpenWorkspace(society)}
          >
            Open workspace →
          </Button>
        </>
      }
    >
      <div className="card-list">

        {/* Society Information */}
        <Card>
          <div>
            <h3 className="card-title">
              {society.society}
            </h3>

            <p className="card-subtitle">
              {society.id} · {society.city}
            </p>

            <p className="card-subtitle">
              Reg. no. {society.registrationNumber}
            </p>
          </div>
        </Card>

        {/* Units */}
        <Card>
          <div>
            <div className="card-title">
              Units
            </div>

            <div>
              {society.units}
            </div>

            <div className="card-subtitle">
              {society.towers} towers
            </div>
          </div>
        </Card>

        {/* Occupancy */}
        <Card>
          <div>
            <div className="card-title">
              Occupancy
            </div>

            <div>
              {occupancy !== null
                ? `${occupancy}%`
                : "—"}
            </div>
          </div>
        </Card>

        {/* Residents */}
        <Card>
          <div>
            <div className="card-title">
              Residents
            </div>

            <div>
              {society.residents}
            </div>

            {society.staff !== undefined && (
              <div className="card-subtitle">
                {society.staff} staff on roll
              </div>
            )}
          </div>
        </Card>

        {/* Collection Rate */}
        <Card>
          <div>
            <div className="card-title">
              Collection rate
            </div>

            <div>
              {collectionRate !== null
                ? `${collectionRate}%`
                : "—"}
            </div>
          </div>
        </Card>

        {/* Account */}
        <Card title="Account">
          <div className="two-column-grid">

            <div>
              <div className="card-subtitle">
                Plan
              </div>

              <StatusBadge
                status={society.plan}
              />
            </div>

            <div>
              <div className="card-subtitle">
                Status
              </div>

              <StatusBadge
                status={society.status}
              />
            </div>

            <div>
              <div className="card-subtitle">
                Onboarded
              </div>

              <div>
                {society.onboarded ?? "—"}
              </div>
            </div>

            <div>
              <div className="card-subtitle">
                Last active
              </div>

              <div>
                {society.lastActive ?? "—"}
              </div>
            </div>

          </div>
        </Card>

        {/* Society Admin Contact */}
        <Card title="Society admin contact">
          <div className="two-column-grid">

            <div>
              <div className="card-subtitle">
                Name
              </div>

              <div>
                {society.adminName ?? "—"}
              </div>
            </div>

            <div>
              <div className="card-subtitle">
                Role
              </div>

              <div>
                {society.adminRole ?? "—"}
              </div>
            </div>

            <div>
              <div className="card-subtitle">
                Phone
              </div>

              <div>
                {society.adminPhone ?? "—"}
              </div>
            </div>

            <div>
              <div className="card-subtitle">
                Email
              </div>

              <div>
                {society.adminEmail ?? "—"}
              </div>
            </div>

          </div>
        </Card>

        {/* Operational Snapshot */}
        <Card title="Operational snapshot">
          <div className="two-column-grid">

            <div>
              <div className="card-subtitle">
                Open complaint tickets
              </div>

              <div>
                {society.openTickets ?? 0}
              </div>
            </div>

            <div>
              <div className="card-subtitle">
                Open SOS alerts
              </div>

              {society.openSOSAlerts !== undefined ? (
                <StatusBadge
                  status={String(
                    society.openSOSAlerts
                  )}
                />
              ) : (
                <div>—</div>
              )}
            </div>

          </div>

        
        </Card>

      </div>
    </Drawer>
  );
}

export default SocietyViewModal;