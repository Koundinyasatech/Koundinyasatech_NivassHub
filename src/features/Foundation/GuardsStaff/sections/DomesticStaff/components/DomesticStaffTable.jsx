import Table from "../../../../../../components/Common/Table/Table";
import Button from "../../../../../../components/Common/Button/Button";

import { domesticStaffColumns } from "../constants/domesticStaffColumns";

function DomesticStaffTable({
  data,
  onEdit,
  onDelete,
}) {
  const rows = data.map((staff) => ({
    ...staff,

    status: (
      <span
        className={`status-badge ${getStatusClass(
          staff.status
        )}`}
      >
        ● {staff.status}
      </span>
    ),

    actions: (
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(staff)}
        >
          Edit
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(staff)}
        >
          Delete
        </Button>
      </div>
    ),
  }));

  return (
    <Table
      columns={domesticStaffColumns}
      data={rows}
    />
  );
}

function getStatusClass(status) {
  switch (status) {
    case "Active":
      return "success";

    case "Inactive":
      return "danger";

    default:
      return "";
  }
}

export default DomesticStaffTable;