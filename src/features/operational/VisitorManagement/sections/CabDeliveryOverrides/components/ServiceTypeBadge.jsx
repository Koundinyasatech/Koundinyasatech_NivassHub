function ServiceTypeBadge({ type }) {
  const getClassName = () => {
    switch (type) {
      case "Food Delivery":
        return "service-type-badge food-delivery";

      case "Courier":
        return "service-type-badge courier";

      case "Cab":
        return "service-type-badge cab";

      case "Grocery":
        return "service-type-badge grocery";

      default:
        return "service-type-badge";
    }
  };

  return (
    <span className={getClassName()}>
      <span className="service-type-dot"></span>
      {type}
    </span>
  );
}

export default ServiceTypeBadge;