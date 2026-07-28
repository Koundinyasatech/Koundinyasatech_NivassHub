import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

import { slotAllocationColumns } from "../constants/slotAllocationColumns";

function SlotAllocationTable({
  data,
  onAllocate,
}) {
  const tableData = data.map((item) => ({
    ...item,

    slot: item.slot || "—",

    allocatedOn:
      item.allocatedOn || "—",

    status: (
      <StatusBadge
        status={item.status}
      />
    ),

    actions: (
      <Button
        variant="text"
        onClick={() =>
          onAllocate(item)
        }
      >
        Allocate / transfer
      </Button>
    ),
  }));

  return (
    <Table
      columns={slotAllocationColumns}
      data={tableData}
    />
  );
}

export default SlotAllocationTable;