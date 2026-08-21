import whitelistColumns from "../constants/whitelistColumns";
import CategoryBadge from "./CategoryBadge";
import StatusBadge from "./StatusBadge";

function WhitelistTable({ data }) {
  return (
    <div className="whitelist-table-wrapper">
      <table className="whitelist-table">
        <thead>
          <tr>
            {whitelistColumns.map((column) => (
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
                <td className="whitelist-name">
                  {item.name}
                </td>

                <td>
                  <CategoryBadge
                    category={item.category}
                  />
                </td>

                <td>{item.phone}</td>

                <td>{item.gates}</td>

                <td>
                  <StatusBadge
                    status={item.status}
                  />
                </td>

                <td>
                  <div className="whitelist-actions">

                    <button
                      className="edit-btn"
                    >
                      {item.action1}
                    </button>

                    <button
                      className={
                        item.action2 === "Suspend"
                          ? "suspend-btn"
                          : "reinstate-btn"
                      }
                    >
                      {item.action2}
                    </button>

                  </div>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="whitelist-no-records"
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

export default WhitelistTable;