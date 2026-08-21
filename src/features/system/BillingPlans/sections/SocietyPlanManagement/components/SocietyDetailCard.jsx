function SocietyDetailCard({
  label,
  value,
  subtitle,
  accent = "default",
  children,
}) {
  const accentColors = {
    orange: "#d97706",
    green: "#5f8063",
    blue: "#31567a",
    default: "#d6d3ce",
  };

  return (
    <div
      style={{
        border: "1px solid #ddd8cf",
        borderTop: `3px solid ${accentColors[accent]}`,
        borderRadius: "16px",
        padding: "28px 30px",
        background: "#ffffff",
        minHeight: "150px",
        boxSizing: "border-box",
      }}
    >
      {label && (
        <div
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#737b8c",
            marginBottom: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.3px",
          }}
        >
          {label}
        </div>
      )}

      {value !== undefined && value !== null && (
        <div
          style={{
            fontSize: "42px",
            lineHeight: 1.1,
            fontWeight: 700,
            color: "#182235",
          }}
        >
          {value}
        </div>
      )}

      {subtitle && (
        <div
          style={{
            marginTop: "10px",
            fontSize: "16px",
            color: "#374151",
          }}
        >
          {subtitle}
        </div>
      )}

      {children}
    </div>
  );
}

export default SocietyDetailCard;