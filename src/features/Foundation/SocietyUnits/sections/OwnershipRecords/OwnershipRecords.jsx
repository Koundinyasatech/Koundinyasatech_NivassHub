import { useEffect, useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import OwnershipFilters from "../../components/OwnershipFilters";
import OwnershipTable from "../../components/OwnershipTable";

import "./OwnershipRecords.css";

const PAGE_SIZE = 5;

function OwnershipRecords({
  ownerships = [],
  onTransfer,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return ownerships.filter((record) => {
      const keyword = search.toLowerCase();

      return (
        record.unitNumber.toLowerCase().includes(keyword) ||
        record.owner.toLowerCase().includes(keyword) ||
        record.coOwner.toLowerCase().includes(keyword)
      );
    });
  }, [ownerships, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(
    filteredData.length / PAGE_SIZE
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredData.slice(
      start,
      start + PAGE_SIZE
    );
  }, [filteredData, currentPage]);

  return (
    <Card>
      <OwnershipFilters
        search={search}
        onSearchChange={setSearch}
        recordCount={filteredData.length}
      />

      <OwnershipTable
        data={paginatedData}
        onTransfer={onTransfer}
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

export default OwnershipRecords;