import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import ShiftRosterTable from "./components/ShiftRosterTable";

function ShiftRoster({
  shiftRoster,
  onAdd,
  onEdit,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  // =====================================================
  // Search Filter
  // =====================================================

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return shiftRoster.filter((item) =>
      [
        item.gate,
        item.monday,
        item.tuesday,
        item.wednesday,
        item.thursday,
        item.friday,
        item.saturday,
        item.sunday,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(keyword)
      )
    );
  }, [shiftRoster, search]);

  // =====================================================
  // Pagination
  // =====================================================

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
        <div className="tower-search">
          <Input
            placeholder="Search Gate / Guard..."
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

      <ShiftRosterTable
        data={paginatedData}
        onEdit={onEdit}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}

export default ShiftRoster;