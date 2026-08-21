import Table from "../../../../../../components/Common/Table/Table";
import Button from "../../../../../../components/Common/Button/Button";

import { pollCreatorColumns } from "../constants/pollCreatorColumns";
import { getStatusClass } from "../utils/pollCreatorHelpers";

function PollCreatorTable({
  data,
  onView,
  onEdit,
  onClose,
}) {
  const rows = data.map((poll) => ({
    ...poll,

    status: (
      <span
        className={`status-badge ${getStatusClass(
          poll.status
        )}`}
      >
        ● {poll.status}
      </span>
    ),

    actions: (
      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            onView(poll)
          }
        >
          View
        </Button>

        <Button
          size="sm"
          onClick={() =>
            onEdit(poll)
          }
        >
          Edit
        </Button>

        {poll.status ===
          "Open" && (
          <Button
            size="sm"
            variant="danger"
            onClick={() =>
              onClose(poll)
            }
          >
            Close
          </Button>
        )}
      </div>
    ),
  }));

  return (
    <Table
      columns={
        pollCreatorColumns
      }
      data={rows}
    />
  );
}

export default PollCreatorTable;