import Table from "../../../../components/Common/Table/Table";
import StatusBadge from "../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../components/Common/Button/Button";

import { moveInMoveOutColumns } from "../constants/moveInMoveOutColumns";

function MoveInMoveOutTable({
  data,
  onProcess,
}) {
  const tableData = data.map((item) => ({
    ...item,

    type: (
      <StatusBadge status={item.type} />
    ),

    stage: (
      <StatusBadge status={item.stage} />
    ),

    actions: (
      <Button
        variant="text"
        size="sm"
        onClick={() => onProcess(item)}
      >
        Process
      </Button>
    ),
  }));

  return (
    <Table
      columns={moveInMoveOutColumns}
      data={tableData}
    />
  );
}

export default MoveInMoveOutTable;