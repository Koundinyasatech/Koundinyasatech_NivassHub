function EntryMethodBadge({ method }) {
  const getClassName = () => {
    switch (method) {
      case "Pre-approved":
        return "entry-method-badge pre-approved";

      case "Whitelisted":
        return "entry-method-badge whitelisted";

      case "OTP Call":
        return "entry-method-badge otp-call";

      default:
        return "entry-method-badge";
    }
  };

  return (
    <span className={getClassName()}>
      <span className="entry-method-dot"></span>
      {method}
    </span>
  );
}

export default EntryMethodBadge;