function StatusBadge({ status }) {
  const getClassName = () => {
    switch (status) {
      case "Active":
        return "status-badge active";

      case "Expired":
        return "status-badge expired";

      case "Cancelled":
        return "status-badge cancelled";

      default:
        return "status-badge";
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