import Table from "../../../../components/Common/Table/Table";
import StatusBadge from "../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../components/Common/Button/Button";

import { tenantColumns } from "../constants/tenantColumns";

function TenantTable({
  data,
  onToggleStatus,
}) {
  const tableData = data.map((tenant) => ({
    ...tenant,

    status: (
      <StatusBadge status={tenant.status} />
    ),

    actions: (
      <Button
        variant="text"
        size="sm"
        onClick={() => onToggleStatus(tenant)}
      >
        Toggle Status
      </Button>
    ),
  }));

  return (
    <Table
      columns={tenantColumns}
      data={tableData}
    />
  );
}

export default TenantTable;