import auditColumns from "../constants/auditColumns";
import EntryMethodBadge from "./EntryMethodBadge";

function AuditTable({ data }) {
  return (
    <div className="audit-table-wrapper">
      <table className="audit-table">
        <thead>
          <tr>
            {auditColumns.map((column) => (
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
            data.map((item) => (
              <tr key={item.id}>
                <td className="visitor-name">
                  {item.visitor}
                </td>

                <td>{item.flat}</td>

                <td>{item.gate}</td>

                <td>{item.entryTime}</td>

                <td>{item.exitTime}</td>

                <td>
                  <EntryMethodBadge
                    method={item.method}
                  />
                </td>

                <td>{item.guard}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="audit-no-records"
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

export default AuditTable;