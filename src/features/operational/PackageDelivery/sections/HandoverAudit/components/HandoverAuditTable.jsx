import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";

import { handoverColumns } from "../constants/handoverColumns";

function HandoverAuditTable({
  data,
}) {
  const tableData = data.map((item) => ({
    ...item,

    method: (
      <StatusBadge
        status={item.method}
      />
    ),
  }));

  return (
    <Table
      columns={handoverColumns}
      data={tableData}
    />
  );
}

export default HandoverAuditTable;