import "./TextArea.css";

function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  required = false,
  disabled = false,
  readOnly = false,
  error = "",
}) {
  return (
    <div className="textarea-wrapper">
      {label && (
        <label className="textarea-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        className={`common-textarea ${error ? "textarea-error" : ""}`}
      />

      {error && (
        <small className="error-text">
          {error}
        </small>
      )}
    </div>
  );
}

export default TextArea;