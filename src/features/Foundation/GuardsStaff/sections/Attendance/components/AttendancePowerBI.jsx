import Card from "../../../../../components/Common/Card/Card";

function AttendancePowerBI() {
  return (
    <Card className="attendance-powerbi-card">
      <div className="attendance-powerbi-header">
        Guards on Duty — Last 7 Days
      </div>

      <div className="attendance-powerbi-placeholder">
        <div className="attendance-powerbi-icon">
          📊
        </div>

        <h3>
          Power BI Report
        </h3>

        <p>
          Attendance analytics will be
          displayed here after Power BI
          integration.
        </p>
      </div>
    </Card>
  );
}

export default AttendancePowerBI;