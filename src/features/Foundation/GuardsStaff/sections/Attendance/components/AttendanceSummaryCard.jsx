import Card from "../../../../../components/Common/Card/Card";

function AttendanceSummaryCard({
  title,
  value,
  subtitle,
  subtitleClass = "",
}) {
  return (
    <Card className="attendance-summary-card">
      <div className="attendance-summary-title">
        {title}
      </div>

      <div className="attendance-summary-value">
        {value}
      </div>

      {subtitle && (
        <div
          className={`attendance-summary-subtitle ${subtitleClass}`}
        >
          {subtitle}
        </div>
      )}
    </Card>
  );
}

export default AttendanceSummaryCard;