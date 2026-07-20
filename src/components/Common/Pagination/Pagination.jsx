import "./Pagination.css";

function Pagination({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  onPageChange,
}) {
  const start =
    totalRecords === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const end = Math.min(
    currentPage * pageSize,
    totalRecords
  );

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing {start}-{end} of {totalRecords}
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn pagination-arrow"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
        >
          &#8249;
        </button>

        {Array.from(
          {
            length: Math.max(totalPages, 1),
          },
          (_, index) => (
            <button
              key={index + 1}
              className={`pagination-btn pagination-page ${
                currentPage === index + 1
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                onPageChange(index + 1)
              }
            >
              {index + 1}
            </button>
          )
        )}

        <button
          className="pagination-btn pagination-arrow"
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            onPageChange(currentPage + 1)
          }
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

export default Pagination;