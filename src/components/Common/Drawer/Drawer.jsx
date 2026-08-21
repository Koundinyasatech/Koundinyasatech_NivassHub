import "./Drawer.css";

function Drawer({
  isOpen,
  open,
  onClose,
  title,
  children,
  footer,
  width = "630px",
}) {
  const visible = isOpen ?? open;

  if (!visible) {
    return null;
  }

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        className="drawer"
        style={{ width }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-header">
          <h2>{title}</h2>

          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {children}
        </div>

        {footer && (
          <div className="drawer-footer">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}

export default Drawer;