import { useEffect, useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import TenantTable from "../../components/TenantTable";

function Tenants({
  tenants,
  onToggleStatus,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredData = useMemo(() => {
    const searchText = search.toLowerCase();

    return tenants.filter(
      (tenant) =>
        tenant.tenant
          ?.toLowerCase()
          .includes(searchText) ||
        tenant.unit
          ?.toLowerCase()
          .includes(searchText) ||
        tenant.owner
          ?.toLowerCase()
          .includes(searchText) ||
        tenant.leaseStart
          ?.toLowerCase()
          .includes(searchText) ||
        tenant.leaseEnd
          ?.toLowerCase()
          .includes(searchText)
    );
  }, [tenants, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.ceil(
    filteredData.length / pageSize
  );

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

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

      <TenantTable
        data={paginatedData}
        onToggleStatus={onToggleStatus}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </Card>
  );
}

export default Tenants;