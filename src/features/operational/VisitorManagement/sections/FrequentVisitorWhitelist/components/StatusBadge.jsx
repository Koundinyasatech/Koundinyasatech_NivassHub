function StatusBadge({ status }) {
  const getClassName = () => {
    switch (status) {
      case "Active":
        return "whitelist-status-badge active";

      case "Suspended":
        return "whitelist-status-badge suspended";

      default:
        return "whitelist-status-badge";
    }
  };

  return (
    <span className={getClassName()}>
      <span className="status-dot"></span>
      {status}
    </span>
  );
}

export default StatusBadge;