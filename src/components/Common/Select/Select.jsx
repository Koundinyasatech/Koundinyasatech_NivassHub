import "./Select.css";

function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  required = false,
  disabled = false,
  error = "",
}) {
  return (
    <div className="select-wrapper">
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`common-select ${error ? "select-error" : ""}`}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <small className="error-text">
          {error}
        </small>
      )}
    </div>
  );
}

export default Select;