import { useState } from "react";

import Table from "../../../../../components/Common/Table/Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import ParkingChargeModal from "./components/ParkingChargeModal";
import Button from "../../../../../components/Common/Button/Button";
import { parkingChargeDummyData } from "./data/parkingChargeDummyData";
import { parkingChargeColumns } from "./constants/parkingChargeColumns";

function ParkingDuesConfig() {
  const [charges, setCharges] = useState(parkingChargeDummyData);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const tableData = charges.map((item) => ({
  slotType: item.slotType,

  monthlyCharge: `₹${item.monthlyCharge}`,

  actions: (
    <Button
      variant="text"
      onClick={() => {
        setSelectedCharge(item);
        setOpenModal(true);
      }}
    >
      Edit
    </Button>
  ),
}));

  return (
    <>
      <Table
  columns={parkingChargeColumns}
  data={tableData}
/>

      <Pagination
  currentPage={1}
  totalPages={1}
  totalRecords={charges.length}
  pageSize={charges.length}
  onPageChange={() => {}}
/>

      <ParkingChargeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedCharge={selectedCharge}
        setCharges={setCharges}
      />
    </>
  );
}

export default ParkingDuesConfig;