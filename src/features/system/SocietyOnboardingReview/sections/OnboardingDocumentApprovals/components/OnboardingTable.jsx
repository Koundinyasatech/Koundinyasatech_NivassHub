import Table from "../../../../../../components/Common/Table/Table";
import StatusBadge from "../../../../../../components/Common/StatusBadge/StatusBadge";

import { onboardingColumns } from "../constants/onboardingColumns";


function OnboardingTable({
  data,
  onReview,
}) {

  const tableData = data.map((item) => ({
    ...item,

    status: (
      <StatusBadge
        status={item.status}
      />
    ),

    action: (
      <button
        type="button"
        onClick={() => onReview(item)}
        style={{
          border: "none",
          background: "transparent",
          padding: "6px 10px",
          fontSize: "15px",
          fontWeight: "600",
          color: "#0b1628",
          cursor: "pointer",
        }}
      >
        {
          item.status === "Pending"
            ? "Review"
            : "View"
        }
      </button>
    ),
  }));


  return (
    <Table
      columns={onboardingColumns}
      data={tableData}
    />
  );
}


export default OnboardingTable;