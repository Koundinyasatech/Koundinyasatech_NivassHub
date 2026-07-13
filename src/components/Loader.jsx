import "./StatusBadge.css";

function StatusBadge({
  text,
  variant = "green",
}) {
  return (
    <span className={`status-badge ${variant}`}>
      ● {text}
    </span>
  );
}

export default StatusBadge;