import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

function AccessAnomalyTable({
  columns,
  data,
  onReview,
  onView,
}) {
  const tableData = data.map((item) => ({
    ...item,

    type: (
      <StatusBadge
        status={item.type}
        variant="warning"
      />
    ),

    status: (
      <StatusBadge
        status={item.status}
        variant={
          item.status === "Reviewed"
            ? "success"
            : "warning"
        }
      />
    ),

    action:
      item.status === "Reviewed" ? (
        <Button
          variant="secondary"
          onClick={() => onView(item)}
        >
          View
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={() => onReview(item)}
        >
          Review
        </Button>
      ),
  }));

  return (
    <Table
      columns={columns}
      data={tableData}
    />
  );
}

export default AccessAnomalyTable;