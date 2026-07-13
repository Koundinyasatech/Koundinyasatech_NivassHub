import Table from "../../../../components/Common/Table/Table";
import StatusBadge from "../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../components/Common/Button/Button";

import { vehicleColumns } from "../constants/vehicleColumns";

function VehicleTable({
  data,
  onApprove,
  onReject,
  onView,
}) {
  const tableData = data.map((vehicle) => ({
    ...vehicle,

    status: (
      <StatusBadge status={vehicle.status} />
    ),

    actions:
      vehicle.status === "Approved" ? (
        <Button
          variant="text"
          size="sm"
          onClick={() => onView(vehicle)}
        >
          View
        </Button>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <Button
            variant="text"
            size="sm"
            onClick={() => onApprove(vehicle)}
          >
            Approve
          </Button>

          <Button
            variant="text"
            size="sm"
            onClick={() => onReject(vehicle)}
          >
            Reject
          </Button>
        </div>
      ),
  }));

  return (
    <Table
      columns={vehicleColumns}
      data={tableData}
    />
  );
}

export default VehicleTable;