import { useMemo, useState } from "react";
import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Button from "../../../../../components/Common/Button/Button";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import GuardTable from "./components/GuardTable";


function GuardProfiles({
  guards,
  onAdd,
  onEdit,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return guards.filter((item) => {
      return (
        item.name
          .toLowerCase()
          .includes(keyword) ||
        item.gate
          .toLowerCase()
          .includes(keyword) ||
        item.shift
          .toLowerCase()
          .includes(keyword) ||
        item.status
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [guards, search]);

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
    <>
      {/* <div className="page-header-actions">
        <Button onClick={onAdd}>
          + Onboard Guard
        </Button>
      </div> */}

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

        <GuardTable
          data={paginatedData}
          onEdit={onEdit}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Card>
    </>
  );
}

export default GuardProfiles;