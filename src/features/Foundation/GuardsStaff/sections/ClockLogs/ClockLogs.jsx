import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Select from "../../../../../components/Common/Select/Select";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import ClockLogsTable from "./components/ClockLogsTable";

import { flagOptions } from "./constants/flagOptions";

function ClockLogs({
  clockLogs,
  onViewClockLog,
}) {
  const [search, setSearch] = useState("");
  const [flag, setFlag] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return clockLogs.filter((item) => {
      const matchesSearch = [
        item.guard,
        item.date,
        item.clockIn,
        item.clockOut,
        item.hours,
        item.flag,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(keyword)
      );

      const matchesFlag =
        flag === ""
          ? true
          : item.flag === flag;

      return (
        matchesSearch &&
        matchesFlag
      );
    });
  }, [clockLogs, search, flag]);

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
            value={flag}
            onChange={setFlag}
            options={flagOptions}
            placeholder="All Flags"
          />
        </div>

        <div className="record-count">
          {filteredData.length} Records
        </div>
      </div>

      <ClockLogsTable
        data={paginatedData}
        onView={onViewClockLog}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}

export default ClockLogs;