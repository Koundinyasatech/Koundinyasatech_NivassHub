import { useState } from "react";

import VehicleRequestCard from "./components/VehicleRequestCard";

import { multiVehicleDummyData } from "./data/multiVehicleDummyData";

function MultiVehicleManagement() {
  const [units, setUnits] = useState(
    multiVehicleDummyData
  );

  const handleAction = (id) => {
    setUnits((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              pending: false,
            }
          : item
      )
    );
  };

  return (
    <div className="card-list">
      {units.map((unit) => (
        <VehicleRequestCard
          key={unit.id}
          unit={unit}
          onApprove={() => handleAction(unit.id)}
          onReject={() => handleAction(unit.id)}
        />
      ))}
    </div>
  );
}

export default MultiVehicleManagement;