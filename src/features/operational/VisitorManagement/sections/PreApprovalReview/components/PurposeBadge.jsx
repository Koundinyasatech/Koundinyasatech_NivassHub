function PurposeBadge({ purpose }) {
  const getClassName = () => {
    switch (purpose) {
      case "Guest":
        return "purpose-badge guest";

      case "Delivery":
        return "purpose-badge delivery";

      case "Vendor":
        return "purpose-badge vendor";

      default:
        return "purpose-badge";
    }
  };

  return (
    <span className={getClassName()}>
      <span className="purpose-dot"></span>
      {purpose}
    </span>
  );
}

export default PurposeBadge;