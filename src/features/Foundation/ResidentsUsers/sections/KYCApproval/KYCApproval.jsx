import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import KYCTable from "../../components/KYCTable";

function KYCApproval({
  kycRecords,
  onReview,
  onView,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return kycRecords.filter((item) => {
      return (
        item.resident
          .toLowerCase()
          .includes(keyword) ||
        item.unit
          .toLowerCase()
          .includes(keyword) ||
        item.document
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [kycRecords, search]);

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

      <KYCTable
        data={paginatedData}
        onReview={onReview}
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

export default KYCApproval;