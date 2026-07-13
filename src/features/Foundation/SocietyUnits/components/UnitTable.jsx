import Table from "../../../../components/Common/Table/Table";
import Button from "../../../../components/Common/Button/Button";
import Badge from "../../../../components/Common/StatusBadge/StatusBadge";

import { unitColumns } from "../constants/unitColumns";

function UnitTable({
  data,
  onEdit,
  onDelete,
}) {
  const getBadgeVariant = (status) => {
    switch (status) {
      case "Occupied":
        return "success";

      case "Vacant":
        return "warning";

      case "Locked":
        return "secondary";

      default:
        return "default";
    }
  };

  const tableData = data.map((unit) => ({
    ...unit,

    status: (
      <Badge status={unit.status} />
    ),
    actions: (
      <div className="table-actions">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(unit)}
        >
          Edit
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(unit)}
        >
          Delete
        </Button>
      </div>
    ),
  }));

  return (
    <Table
      columns={unitColumns}
      data={tableData}
    />
  );
}

export default UnitTable;