function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>

      <div className="pagination-buttons">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
        >
          &lt;
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              className={
                currentPage === index + 1
                  ? "pagination-btn active"
                  : "pagination-btn"
              }
              onClick={() =>
                onPageChange(index + 1)
              }
            >
              {index + 1}
            </button>
          )
        )}

        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Pagination;