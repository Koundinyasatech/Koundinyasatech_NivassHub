import "./Breadcrumb.css";

function Breadcrumb({ items = [] }) {
  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <div className="breadcrumb-item" key={index}>
          <span
            className={
              index === items.length - 1
                ? "breadcrumb-active"
                : "breadcrumb-link"
            }
          >
            {item}
          </span>

          {index !== items.length - 1 && (
            <span className="breadcrumb-separator">
              /
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;