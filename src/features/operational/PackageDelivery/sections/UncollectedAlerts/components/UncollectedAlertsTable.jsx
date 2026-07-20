import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";

import { uncollectedAlertColumns } from "../constants/uncollectedAlertColumns";

function UncollectedAlertsTable({
  data,
}) {
  const tableData = data.map((item) => ({
    ...item,

    hoursWaiting: (
      <StatusBadge
        status={item.hoursWaiting}
      />
    ),
  }));

  return (
    <Table
      columns={uncollectedAlertColumns}
      data={tableData}
    />
  );
}

export default UncollectedAlertsTable;