function SocietyPlanStats({ data }) {
  const totalUnits = data.reduce(
    (sum, item) => sum + item.units,
    0
  );

  const totalResidents = data.reduce(
    (sum, item) => sum + item.residents,
    0
  );

  const activeSocieties = data.filter(
    (item) => item.status === "Active"
  ).length;

  const averageCollection = Math.round(
    data.reduce(
      (sum, item) => sum + item.collection,
      0
    ) / data.length
  );

  return (
    <div className="society-plan-stats">

      <div className="stat-card stat-card-blue">
        <div className="stat-label">
          SOCIETIES ON PLATFORM
        </div>

        <div className="stat-value">
          {data.length}
        </div>

        <div className="stat-subtext">
          {activeSocieties} active
        </div>
      </div>

      <div className="stat-card stat-card-orange">
        <div className="stat-label">
          TOTAL UNITS MANAGED
        </div>

        <div className="stat-value">
          {totalUnits}
        </div>
      </div>

      <div className="stat-card stat-card-navy">
        <div className="stat-label">
          TOTAL RESIDENTS
        </div>

        <div className="stat-value">
          {totalResidents}
        </div>
      </div>

      <div className="stat-card stat-card-yellow">
        <div className="stat-label">
          AVG. COLLECTION RATE
        </div>

        <div className="stat-value">
          {averageCollection}%
        </div>
      </div>

    </div>
  );
}

export default SocietyPlanStats;