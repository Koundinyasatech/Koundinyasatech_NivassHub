import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

function QRGatePassTable({
  columns,
  data,
  onExtend,
  onView,
  onRevoke,
}) {
  const formattedData = data.map((item) => ({
    ...item,

    status: (
      <StatusBadge status={item.status} />
    ),

    action:
      item.action === "Extend" ? (
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            size="small"
            onClick={() => onExtend(item)}
          >
            Extend
          </Button>

          <Button
            size="small"
            variant="danger"
            onClick={() => onRevoke(item)}
          >
            Revoke
          </Button>
        </div>
      ) : (
        <Button
          size="small"
          onClick={() => onView(item)}
        >
          View
        </Button>
      ),
  }));

  const tableColumns = columns.map((column) => ({
    ...column,
    render: undefined,
  }));

  return (
    <Table
      columns={tableColumns}
      data={formattedData}
    />
  );
}

export default QRGatePassTable;