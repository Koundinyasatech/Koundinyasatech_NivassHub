import { useState, useMemo } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import ReminderSettings from "./components/ReminderSettings";
import UncollectedAlertsTable from "./components/UncollectedAlertsTable";

import {
  reminderSettings,
  uncollectedAlertsDummyData,
} from "./data/uncollectedAlertsDummyData";

function UncollectedAlerts() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return uncollectedAlertsDummyData.filter((item) => {
      return (
        item.packageId
          .toLowerCase()
          .includes(keyword) ||
        item.unit
          .toLowerCase()
          .includes(keyword) ||
        item.courier
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [search]);

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
      <div
  style={{
    maxWidth: "760px",
    marginBottom: "28px",
  }}
>
  <ReminderSettings
    settings={reminderSettings}
  />
</div>

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

        <UncollectedAlertsTable
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
    </>
  );
}

export default UncollectedAlerts;