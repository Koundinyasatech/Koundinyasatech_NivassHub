import { useEffect, useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import TowerTable from "../../components/TowerTable";

import "./TowerManagement.css";

const PAGE_SIZE = 5;

function TowerManagement({
  towers = [],
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Search Filter
  const filteredData = useMemo(() => {
    return towers.filter((tower) =>
      tower.tower
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [towers, search]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Total Pages
  const totalPages = Math.ceil(
    filteredData.length / PAGE_SIZE
  );

  // Paginated Data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredData.slice(
      start,
      start + PAGE_SIZE
    );
  }, [filteredData, currentPage]);

  return (
    <Card>
      <div className="tower-toolbar">
        <div className="tower-search">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="record-count">
          {filteredData.length} Records
        </div>
      </div>

      <TowerTable
        data={paginatedData}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={filteredData.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </Card>
  );
}

export default TowerManagement;