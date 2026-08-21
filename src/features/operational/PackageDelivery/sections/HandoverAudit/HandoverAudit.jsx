import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import HandoverAuditTable from "./components/HandoverAuditTable";

import { handoverDummyData } from "./data/handoverDummyData";

function HandoverAudit() {
  // =========================================
  // State
  // =========================================

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const pageSize = 10;

  // =========================================
  // Filter
  // =========================================

  const filteredData = useMemo(() => {
    const keyword =
      search.toLowerCase();

    return handoverDummyData.filter(
      (item) =>
        item.record
          .toLowerCase()
          .includes(keyword) ||
        item.packageId
          .toLowerCase()
          .includes(keyword) ||
        item.collectedBy
          .toLowerCase()
          .includes(keyword) ||
        item.method
          .toLowerCase()
          .includes(keyword)
    );
  }, [search]);

  // =========================================
  // Pagination
  // =========================================

  const totalPages = Math.ceil(
    filteredData.length / pageSize
  );

  const paginatedData = useMemo(() => {
    const start =
      (page - 1) * pageSize;

    return filteredData.slice(
      start,
      start + pageSize
    );
  }, [filteredData, page]);

  // =========================================
  // Render
  // =========================================

  return (
    <Card>

      <div className="tower-toolbar">

        <div className="tower-search">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        <div className="record-count">
          {filteredData.length} Records
        </div>

      </div>

      <HandoverAuditTable
        data={paginatedData}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalRecords={
          filteredData.length
        }
        pageSize={pageSize}
        onPageChange={setPage}
      />

    </Card>
  );
}

export default HandoverAudit;