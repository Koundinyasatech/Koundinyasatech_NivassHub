import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

import { guardColumns } from "../constants/guardColumns";

function GuardTable({
  data,
  onEdit,
}) {
  const tableData = data.map((item) => ({
    ...item,

    idProof: (
      <StatusBadge status={item.idProof} />
    ),

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
      columns={guardColumns}
      data={tableData}
    />
  );
}

export default GuardTable;