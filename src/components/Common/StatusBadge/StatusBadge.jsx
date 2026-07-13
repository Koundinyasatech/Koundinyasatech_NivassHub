import "./StatusBadge.css";

function StatusBadge({
  status = "",
  variant,
  children,
}) {
  const badgeStatus =
    variant || status.toLowerCase();

  return (
    <span className={`status-badge ${badgeStatus}`}>
      {children || status}
    </span>
  );
}

export default StatusBadge;