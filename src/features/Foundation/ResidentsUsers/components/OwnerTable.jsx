import Table from "../../../../components/Common/Table/Table";
import StatusBadge from "../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../components/Common/Button/Button";

import { ownerColumns } from "../constants/ownerColumns";

function OwnerTable({
  data,
  onEdit,
}) {
  const tableData = data.map((owner) => ({
    ...owner,

    status: (
      <StatusBadge status={owner.status} />
    ),

    actions: (
      <Button
        variant="text"
        size="sm"
        onClick={() => onEdit(owner)}
      >
        View / Edit
      </Button>
    ),
  }));

  return (
    <Table
      columns={ownerColumns}
      data={tableData}
    />
  );
}

export default OwnerTable;