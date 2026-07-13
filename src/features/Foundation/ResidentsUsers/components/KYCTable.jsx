import Table from "../../../../components/Common/Table/Table";
import StatusBadge from "../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../components/Common/Button/Button";

import { kycColumns } from "../constants/kycColumns";

function KYCTable({
  data,
  onReview,
  onView,
}) {
  const tableData = data.map((item) => ({
    ...item,

    status: (
      <StatusBadge status={item.status} />
    ),

    actions:
      item.status === "Pending" ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onReview(item)}
        >
          Review
        </Button>
      ) : (
        <Button
          variant="text"
          size="sm"
          onClick={() => onView(item)}
        >
          View
        </Button>
      ),
  }));

  return (
    <Table
      columns={kycColumns}
      data={tableData}
    />
  );
}

export default KYCTable;