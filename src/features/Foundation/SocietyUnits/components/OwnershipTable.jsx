import Table from "../../../../components/Common/Table/Table";
import Button from "../../../../components/Common/Button/Button";
import StatusBadge from "../../../../components/Common/StatusBadge/StatusBadge";

import { ownershipColumns } from "../constants/ownershipColumns";

function OwnershipTable({
  data,
  onTransfer,
  onDelete,
}) {
  const tableData = data.map((record) => ({
    ...record,

    status: (
      <StatusBadge status={record.status} />
    ),

    actions: (
      <div className="table-actions">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onTransfer(record)}
        >
          Transfer
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(record)}
        >
          Delete
        </Button>
      </div>
    ),
  }));

  return (
    <Table
      columns={ownershipColumns}
      data={tableData}
    />
  );
}

export default OwnershipTable;