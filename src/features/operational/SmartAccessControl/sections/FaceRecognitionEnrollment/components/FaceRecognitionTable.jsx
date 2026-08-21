import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

function FaceRecognitionTable({
  columns,
  data,
  onApprove,
  onRemove,
}) {
  const formattedData = data.map((item) => ({
    ...item,

    status: (
      <StatusBadge status={item.status} />
    ),

    approve:
      item.status === "Pending" ? (
        <Button
          size="small"
          variant="secondary"
          onClick={() => onApprove(item)}
        >
          Approve
        </Button>
      ) : (
        ""
      ),

    remove: (
      <Button
        size="small"
        variant="danger"
        onClick={() => onRemove(item)}
      >
        Remove
      </Button>
    ),
  }));

  return (
    <Table
      columns={columns}
      data={formattedData}
    />
  );
}

export default FaceRecognitionTable;