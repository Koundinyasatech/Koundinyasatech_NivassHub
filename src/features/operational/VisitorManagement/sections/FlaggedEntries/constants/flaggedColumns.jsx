import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import Button from "../../../../../../components/Common/Button/Button";

const flaggedColumns = [
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Visitor / Event",
    accessor: "visitor",
  },
  {
    header: "Unit",
    accessor: "unit",
  },
  {
    header: "Gate",
    accessor: "gate",
  },
  {
    header: "Reason",
    accessor: "reason",
  },
  {
    header: "Time",
    accessor: "time",
  },
  {
    header: "Status",
    accessor: "status",
    render: (row) => (
      <StatusBadge status={row.status} />
    ),
  },
  {
    header: "Action",
    accessor: "action",
    render: (row) => (
      <Button size="small">
        {row.status === "Resolved" ? "View" : "Review"}
      </Button>
    ),
  },
];

export default flaggedColumns;