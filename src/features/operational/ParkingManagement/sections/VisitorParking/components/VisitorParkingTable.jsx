import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

import { visitorParkingColumns } from "../constants/visitorParkingColumns";

function VisitorParkingTable({
  data,
  onView,
  onRevoke,
}) {
  const tableData = data.map((item) => ({
    ...item,

    status: (
      <StatusBadge
        status={item.status}
      />
    ),

    actions:
      item.status === "Occupied" ? (
        <Button
          variant="danger"
          onClick={() => onRevoke(item)}
        >
          Revoke
        </Button>
      ) : (
        <Button
          variant="text"
          onClick={() => onView(item)}
        >
          View
        </Button>
      ),
  }));

  return (
    <Table
      columns={visitorParkingColumns}
      data={tableData}
    />
  );
}

export default VisitorParkingTable;