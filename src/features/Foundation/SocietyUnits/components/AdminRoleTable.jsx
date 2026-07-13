import Table from "../../../../components/Common/Table/Table";
import StatusBadge from "../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../components/Common/Button/Button";

import { adminRoleColumns } from "../constants/adminRoleColumns";

function AdminRoleTable({
  data,
  onEdit,
}) {
  const tableData = data.map((role) => ({
    ...role,

    status: (
      <StatusBadge status={role.status} />
    ),

    actions: (
      <Button
        variant="text"
        size="sm"
        onClick={() => onEdit(role)}
      >
        Edit
      </Button>
    ),
  }));

  return (
    <Table
      columns={adminRoleColumns}
      data={tableData}
    />
  );
}

export default AdminRoleTable;