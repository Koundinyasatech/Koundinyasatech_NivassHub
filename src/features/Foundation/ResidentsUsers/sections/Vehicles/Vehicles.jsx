import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Select from "../../../../../components/Common/Select/Select";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import VehicleTable from "../../components/VehicleTable";

import { vehicleTypeOptions } from "../../constants/vehicleTypeOptions";

function Vehicles({
  vehicles,
  onApprove,
  onReject,
  onView,
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredData = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        vehicle.plateNumber
          .toLowerCase()
          .includes(keyword) ||
        vehicle.unit
          .toLowerCase()
          .includes(keyword) ||
        vehicle.type
          .toLowerCase()
          .includes(keyword) ||
        vehicle.parkingSlot
          .toLowerCase()
          .includes(keyword);
      const matchesType =
        type === "All" ||
        vehicle.type === type;

      return (
        matchesSearch && matchesType
      );
    });
  }, [vehicles, search, type]);

  const totalPages = Math.ceil(
    filteredData.length / pageSize
  );

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredData.slice(
      start,
      start + pageSize
    );
  }, [filteredData, page]);

  return (
    <Card>
      <div className="tower-toolbar">
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <Select
            value={type}
            options={vehicleTypeOptions}
            onChange={setType}
          />
        </div>

        <div className="record-count">
          {filteredData.length} Records
        </div>
      </div>

      <VehicleTable
        data={paginatedData}
        onApprove={onApprove}
        onReject={onReject}
        onView={onView}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}

export default Vehicles;