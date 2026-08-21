import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

import { courierColumns } from "../constants/courierColumns";

function CourierWhitelistTable({
  data,
  onEdit,
}) {
  const tableData = data.map((item) => ({
    ...item,

    skipCall: (
      <StatusBadge
        status={item.skipCall}
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
      columns={courierColumns}
      data={tableData}
    />
  );
}

export default CourierWhitelistTable;