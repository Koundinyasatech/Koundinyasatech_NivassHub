import Card from "../../../../../../components/Common/Card/Card";

function StatusColumn({
  title,
  data = [],
}) {
  return (
    <Card>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "16px",
          marginBottom: "16px",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            margin: 0,
          }}
        >
          {title}
        </h3>

        <span
          style={{
            color: "#6B7280",
            fontSize: "14px",
          }}
        >
          {data.length}{" "}
          {data.length === 1
            ? "package"
            : "packages"}
        </span>
      </div>

      {/* Package List */}
      {data.map((item, index) => (
        <div
          key={item.id}
          style={{
            paddingBottom:
              index !== data.length - 1
                ? "16px"
                : "0",
            marginBottom:
              index !== data.length - 1
                ? "16px"
                : "0",
            borderBottom:
              index !== data.length - 1
                ? "1px solid #E5E7EB"
                : "none",
          }}
        >
          <div
            style={{
              fontWeight: "600",
              fontSize: "16px",
              marginBottom: "6px",
            }}
          >
            {item.packageId} • {item.unit}
          </div>

          <div
            style={{
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            {item.courier} — {item.receivedAt}
          </div>
        </div>
      ))}
    </Card>
  );
}

export default StatusColumn;