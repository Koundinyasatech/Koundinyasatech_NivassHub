import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

function BoomBarrierTable({
  columns,
  data,
  onEdit,
  onTestConnection,
}) {
  const formattedData = data.map((item) => ({
    ...item,

    connection: (
      <StatusBadge status={item.connection} />
    ),

    action: (
      <Button
        size="small"
        onClick={() => onEdit(item)}
      >
        Edit
      </Button>
    ),

    test: (
      <Button
        size="small"
        onClick={() => onTestConnection(item)}
      >
        Test connection
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

export default BoomBarrierTable;