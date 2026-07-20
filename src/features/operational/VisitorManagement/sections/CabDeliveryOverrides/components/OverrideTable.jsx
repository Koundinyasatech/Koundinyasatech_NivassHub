import overrideColumns from "../constants/overrideColumns";
import ServiceTypeBadge from "./ServiceTypeBadge";
import WorkflowBadge from "./WorkflowBadge";

function OverrideTable({ data }) {
  return (
    <div className="override-table-wrapper">
      <table className="override-table">
        <thead>
          <tr>
            {overrideColumns.map((column) => (
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

                <td className="service-name">
                  {item.service}
                </td>

                <td>
                  <ServiceTypeBadge
                    type={item.type}
                  />
                </td>

                <td>
                  <WorkflowBadge
                    workflow={item.workflow}
                  />
                </td>

                <td>
                  {item.waitTime}
                </td>

                <td>
                  <button className="configure-btn">
                    {item.action}
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="override-no-records"
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

export default OverrideTable;