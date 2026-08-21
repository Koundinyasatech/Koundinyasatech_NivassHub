import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

import { shiftRosterColumns } from "../constants/shiftRosterColumns";

function ShiftRosterTable({
  data,
  onEdit,
}) {
  const tableData = data.map((item) => ({
    ...item,

    status: (
      <StatusBadge status={item.status} />
    ),

    actions: (
      <Button
        variant="text"
        size="sm"
        onClick={() => onEdit(item)}
      >
        Edit
      </Button>
    ),
  }));

  return (
    <Table
      columns={shiftRosterColumns}
      data={tableData}
    />
  );
}

export default ShiftRosterTable;