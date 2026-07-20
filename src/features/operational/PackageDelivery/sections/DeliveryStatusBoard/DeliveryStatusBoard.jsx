import StatusColumn from "./components/StatusColumn";

import { deliveryStatusDummyData } from "./data/deliveryStatusDummyData";

function DeliveryStatusBoard() {
  return (
    <div className="three-column-grid">
      <StatusColumn
        title="Stored in Locker"
        data={
          deliveryStatusDummyData.stored
        }
      />

      <StatusColumn
        title="Uncollected (Overdue)"
        data={
          deliveryStatusDummyData.overdue
        }
      />

      <StatusColumn
        title="Collected"
        data={
          deliveryStatusDummyData.collected
        }
      />
    </div>
  );
}

export default DeliveryStatusBoard;