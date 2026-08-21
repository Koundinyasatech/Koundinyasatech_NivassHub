import PurposeBadge from "./PurposeBadge";
import StatusBadge from "./StatusBadge";
import tableColumns from "../constants/tableColumns";

function PreApprovalTable({ data }) {
  return (
    <div className="preapproval-table-wrapper">
      <table className="preapproval-table">
        <thead>
          <tr>
            {tableColumns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((visitor) => (
              <tr key={visitor.id}>
                <td className="pass-id">{visitor.passId}</td>

                <td>{visitor.unit}</td>

                <td>{visitor.visitor}</td>

                <td>
                  <PurposeBadge purpose={visitor.purpose} />
                </td>

                <td>{visitor.validUntil}</td>

                <td>
                  <StatusBadge status={visitor.status} />
                </td>

                <td>
                  {visitor.action === "View" ? (
                    <button className="view-btn">
                      View
                    </button>
                  ) : (
                    <button className="override-btn">
                      Override / Cancel765432345678
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="no-records"
              >
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PreApprovalTable;