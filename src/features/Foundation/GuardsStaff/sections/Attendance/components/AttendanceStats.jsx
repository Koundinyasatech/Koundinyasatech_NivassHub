import AttendanceSummaryCard from "./AttendanceSummaryCard";

import { attendanceCards } from "../constants/attendanceCards";

function AttendanceStats({ stats }) {
  return (
    <div className="attendance-stats">
      {attendanceCards.map((card) => {
        switch (card.key) {
          case "onDuty":
            return (
              <AttendanceSummaryCard
                key={card.key}
                title={card.title}
                value={stats.onDuty}
                subtitle={`of ${stats.totalGuards} total`}
              />
            );

          case "absent":
            return (
              <AttendanceSummaryCard
                key={card.key}
                title={card.title}
                value={stats.absent}
                subtitle="Flagged for follow-up"
                subtitleClass="danger"
              />
            );

          case "overtime":
            return (
              <AttendanceSummaryCard
                key={card.key}
                title={card.title}
                value={`${stats.overtime} hrs`}
                subtitle={`${stats.overtimeChange} vs last week`}
                subtitleClass="success"
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default AttendanceStats;