import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

import { lockerColumns } from "../constants/lockerColumns";

function SmartLockerTable({
  data,
  onEdit,
}) {

  const tableData = data.map((item) => ({
    ...item,

    status: (
      <StatusBadge
        status={item.status}
      />
    ),

    actions: (
      <Button
        variant="text"
        onClick={() => onEdit(item)}
      >
        Edit
      </Button>
    ),

  }));

  return (
    <Table
      columns={lockerColumns}
      data={tableData}
    />
  );
}

export default SmartLockerTable;