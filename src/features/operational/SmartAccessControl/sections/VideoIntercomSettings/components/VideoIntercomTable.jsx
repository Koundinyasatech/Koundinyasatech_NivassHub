import Table from "../../../../../../components/Common/Table/Table";
import Button from "../../../../../../components/Common/Button/Button";
function VideoIntercomTable({
  columns,
  data,
  onEdit,
}) {
  const formattedData = data.map((item) => ({
    ...item,
    action: (
      <Button
        size="small"
        onClick={() => onEdit(item)}
      >
        Edit
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

export default VideoIntercomTable;