import "./Table.css";

function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found.",
}) {
  return (
    <div className="table-container">
      <table className="common-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                {column.title ||
                  column.label ||
                  column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="table-message"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="table-message"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row.id || index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;