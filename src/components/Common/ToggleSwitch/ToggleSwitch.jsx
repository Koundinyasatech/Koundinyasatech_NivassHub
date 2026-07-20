import "./ToggleSwitch.css";

function ToggleSwitch({
  checked = false,
  onChange,
  disabled = false,
}) {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) =>
          onChange?.(e.target.checked)
        }
      />

      <span className="toggle-slider"></span>
    </label>
  );
}

export default ToggleSwitch;