import "./Modal.css";

function Modal({
  isOpen,
  open,
  onClose,
  title,
  children,
  footer,
  size = "medium",
}) {
  const visible = isOpen ?? open;

  if (!visible) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className={`modal-container modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>

        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;