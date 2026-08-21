import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

import { slotColumns } from "../constants/slotColumns";

function SlotCatalogueTable({
  data,
  onEdit,
}) {

  const tableData = data.map((item) => ({
    ...item,

    status: (
      <StatusBadge
        status={item.status}
      />
    ),

    actions: (
      <Button
        variant="text"
        onClick={() => onEdit(item)}
      >
        Edit
      </Button>
    ),

  }));

  return (
    <Table
      columns={slotColumns}
      data={tableData}
    />
  );
}

export default SlotCatalogueTable;