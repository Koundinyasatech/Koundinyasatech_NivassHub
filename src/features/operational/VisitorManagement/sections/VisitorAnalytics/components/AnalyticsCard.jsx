import Card from "../../../../../../components/Common/Card/Card";

function AnalyticsCard({
  title,
  value,
  subtitle,
  borderColor,
}) {
  return (
    <div
      style={{
        borderTop: `4px solid ${borderColor}`,
        flex: 1,
      }}
    >
      <Card>
        <p>{title}</p>

        <h1>{value}</h1>

        <p>{subtitle}</p>
      </Card>
    </div>
  );
}

export default AnalyticsCard;