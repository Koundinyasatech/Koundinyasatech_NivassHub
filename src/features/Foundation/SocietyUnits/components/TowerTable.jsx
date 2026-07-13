import Table from "../../../../components/Common/Table/Table";
import Button from "../../../../components/Common/Button/Button";


import { towerColumns } from "../constants/towerColumns";

function TowerTable({
  data,
  onEdit,
  onDelete,
}) {
  const tableData = data.map((tower) => ({
    ...tower,

    actions: (
  <div className="table-actions">
    <Button
      variant="secondary"
      size="sm"
      onClick={() => onEdit(tower)}
    >
      Edit
    </Button>

    <Button
      variant="danger"
      size="sm"
      onClick={() => onDelete(tower)}
    >
      Delete
    </Button>
  </div>
),
      
    
  }));

  return (
    <Table
      columns={towerColumns}
      data={tableData}
    />
  );
}

export default TowerTable;