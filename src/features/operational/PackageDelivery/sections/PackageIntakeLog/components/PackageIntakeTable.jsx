import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";

import { packageColumns } from "../constants/packageColumns";

function PackageIntakeTable({
  data,
}) {

  const tableData = data.map((item) => ({
    ...item,

    status: (
      <StatusBadge
        status={item.status}
      />
    ),

  }));

  return (
    <Table
      columns={packageColumns}
      data={tableData}
    />
  );
}

export default PackageIntakeTable;