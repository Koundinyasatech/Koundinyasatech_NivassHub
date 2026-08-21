import Table from "../../../../../../components/Common/Table/Table";

import { clockLogColumns } from "../constants/clockLogColumns";
import "../styles/clockLogs.css";

function ClockLogsTable({
  data,
  onView,
}) {
  const rows = data.map((item) => ({
    ...item,

    flag: (
      <span
        className={`status-badge ${getFlagClass(
          item.flag
        )}`}
      >
        ● {item.flag}
      </span>
    ),

    actions: (
      <button
        className="table-action-btn"
        onClick={() => onView(item)}
      >
        View
      </button>
    ),
  }));

  return (
    <Table
      columns={clockLogColumns}
      data={rows}
    />
  );
}

function getFlagClass(flag) {
  switch (flag) {
    case "OK":
      return "success";

    case "Late":
      return "warning";

    case "Absent":
      return "danger";

    case "Week Off":
      return "secondary";

    default:
      return "";
  }
}

export default ClockLogsTable;