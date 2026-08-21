import { useEffect, useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Select from "../../../../../components/Common/Select/Select";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import PackageIntakeTable from "./components/PackageIntakeTable";

import { packageIntakeDummyData } from "./data/packageIntakeDummyData";
import { packageStatusOptions } from "./constants/packageStatusOptions";

function PackageIntakeLog() {

  // =========================================
  // Search & Filter State
  // =========================================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  // =========================================
  // Pagination State
  // =========================================

  const [page, setPage] = useState(1);

  const pageSize = 10;

  // =========================================
  // Effects
  // =========================================

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  // =========================================
  // Filtered Data
  // =========================================

  const filteredData = useMemo(() => {

    const keyword = search.toLowerCase();

    return packageIntakeDummyData.filter((item) => {

      const matchesSearch =
        item.packageId
          .toLowerCase()
          .includes(keyword) ||

        item.unit
          .toLowerCase()
          .includes(keyword) ||

        item.courierPartner
          .toLowerCase()
          .includes(keyword) ||

        item.trackingId
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        status === "" ||
        item.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  }, [search, status]);

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

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >

          <div className="tower-search">

            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <Select
            value={status}
            options={packageStatusOptions}
            placeholder="All Status"
            onChange={setStatus}
          />

        </div>

        <div className="record-count">
          {filteredData.length} Records
        </div>

      </div>

      <PackageIntakeTable
        data={paginatedData}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalRecords={filteredData.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />

    </Card>
  );

}

export default PackageIntakeLog;