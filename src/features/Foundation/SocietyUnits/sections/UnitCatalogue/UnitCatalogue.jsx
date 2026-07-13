import { useEffect, useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import UnitFilters from "../../components/UnitFilters";
import UnitTable from "../../components/UnitTable";

import "./UnitCatalogue.css";

const PAGE_SIZE = 5;

function UnitCatalogue({
  units = [],
  towers = [],
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [towerFilter, setTowerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Tower Dropdown Options
  const towerOptions = useMemo(
    () =>
      towers.map((tower) => ({
        label: tower.tower,
        value: tower.tower,
      })),
    [towers]
  );

  // Filter Units
  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      const matchesSearch =
        unit.unitNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        unit.tower
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesTower =
        !towerFilter ||
        unit.tower === towerFilter;

      const matchesStatus =
        !statusFilter ||
        unit.status === statusFilter;

      return (
        matchesSearch &&
        matchesTower &&
        matchesStatus
      );
    });
  }, [
    units,
    search,
    towerFilter,
    statusFilter,
  ]);

  // Reset to First Page when Filters Change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    towerFilter,
    statusFilter,
  ]);

  // Total Pages
  const totalPages = Math.ceil(
    filteredUnits.length / PAGE_SIZE
  );

  // Current Page Data
  const paginatedUnits = useMemo(() => {
    const start =
      (currentPage - 1) * PAGE_SIZE;

    return filteredUnits.slice(
      start,
      start + PAGE_SIZE
    );
  }, [
    filteredUnits,
    currentPage,
  ]);

  return (
    <Card>
      <UnitFilters
        search={search}
        onSearchChange={setSearch}
        tower={towerFilter}
        onTowerChange={setTowerFilter}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        towerOptions={towerOptions}
        recordCount={filteredUnits.length}
      />

      <UnitTable
        data={paginatedUnits}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={filteredUnits.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </Card>
  );
}

export default UnitCatalogue;