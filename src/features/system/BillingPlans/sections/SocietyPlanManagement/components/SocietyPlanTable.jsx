function SocietyPlanTable({
  data,
  onViewDetails,
  onOpenWorkspace,
  onChangePlan,
}) {
  const getPlanClass = (plan) => {
    return `plan-badge plan-${plan
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  return (
    <div className="society-plan-table-wrapper">
      <table className="society-plan-table">

        <thead>
          <tr>
            <th>SOCIETY</th>
            <th>UNITS</th>
            <th>RESIDENTS</th>
            <th>PLAN</th>
            <th>STATUS</th>
            <th>COLLECTION</th>
            <th>OPEN TICKETS</th>
            <th>LAST ACTIVE</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>

              <td>
                <div className="society-name">
                  {item.society}
                </div>

                <div className="society-city">
                  {item.city}
                </div>
              </td>

              <td>{item.units}</td>

              <td>{item.residents}</td>

              <td>
                <span className={getPlanClass(item.plan)}>
                  <span className="badge-dot">●</span>
                  {item.plan}
                </span>
              </td>

              <td>
                <span className={getStatusClass(item.status)}>
                  <span className="badge-dot">●</span>
                  {item.status}
                </span>
              </td>

              <td>{item.collection}%</td>

              <td>{item.openTickets}</td>

              <td>
                <span className="last-active">
                  {item.lastActive}
                </span>
              </td>

              <td>
                <div className="table-actions">

                  <button
                    type="button"
                    onClick={() =>
                      onViewDetails(item)
                    }
                  >
                    View full details
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenWorkspace(item)
                    }
                  >
                    Open workspace
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onChangePlan(item)
                    }
                  >
                    Change plan
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default SocietyPlanTable;