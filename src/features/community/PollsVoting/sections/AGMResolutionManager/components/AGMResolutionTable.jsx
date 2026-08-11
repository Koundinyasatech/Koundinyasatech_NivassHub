import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";
import AGMResolutionActions from "./AGMResolutionActions";

function AGMResolutionTable({
  data,
  loading,
  onEdit,
}) {
  const columns = [
    {
      key: "resolution",
      title: "RESOLUTION",
    },
    {
      key: "quorumRequired",
      title: "QUORUM REQ.",
    },
    {
      key: "quorumMet",
      title: "QUORUM MET",
    },
    {
      key: "date",
      title: "DATE",
    },
    {
      key: "status",
      title: "STATUS",
      render: (row) => (
        <StatusBadge
          status={row.status}
        />
      ),
    },
    {
      key: "actions",
      title: "",
      render: (row) => (
        <AGMResolutionActions
          resolution={row}
          onEdit={onEdit}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
      emptyMessage="No resolutions found."
    />
  );
}

export default AGMResolutionTable;