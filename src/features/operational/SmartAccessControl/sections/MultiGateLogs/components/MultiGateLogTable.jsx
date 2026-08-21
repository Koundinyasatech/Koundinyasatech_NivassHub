import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";

function MultiGateLogTable({ columns, data }) {
  const formattedData = data.map((item) => ({
    ...item,

    gate: (
      <StatusBadge
        status={item.gate}
      />
    ),

    event: (
      <StatusBadge
        status={item.event}
      />
    ),
  }));

  return (
    <Table
      columns={columns}
      data={formattedData}
    />
  );
}

export default MultiGateLogTable;