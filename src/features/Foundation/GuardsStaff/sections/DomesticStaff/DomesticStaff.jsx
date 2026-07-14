import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Select from "../../../../../components/Common/Select/Select";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import DomesticStaffTable from "./components/DomesticStaffTable";

import { staffTypeOptions } from "./constants/staffTypeOptions";

function DomesticStaff({
  domesticStaff,
  staffTypes,
  onEditStaff,
  onDeleteStaff,
}) {
  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("");

  const [page, setPage] =
    useState(1);

  const pageSize = 10;

  const typeOptions = useMemo(
    () => [
      ...staffTypeOptions,
      ...staffTypes,
    ],
    [staffTypes]
  );

  const filteredData = useMemo(() => {
    const keyword =
      search.toLowerCase();

    return domesticStaff.filter(
      (item) => {
        const matchesSearch = [
          item.name,
          item.type,
          item.mobile,
          item.linkedFlats,
          item.status,
        ].some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(keyword)
        );

        const matchesType =
          type === ""
            ? true
            : item.type === type;

        return (
          matchesSearch &&
          matchesType
        );
      }
    );
  }, [
    domesticStaff,
    search,
    type,
  ]);

  const totalPages = Math.ceil(
    filteredData.length /
      pageSize
  );

  const paginatedData =
    useMemo(() => {
      const start =
        (page - 1) *
        pageSize;

      return filteredData.slice(
        start,
        start + pageSize
      );
    }, [
      filteredData,
      page,
    ]);

  return (
    <Card>
      <div className="tower-toolbar">
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems:
              "center",
          }}
        >
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

          <Select
            value={type}
            options={typeOptions}
            placeholder="All Types"
            onChange={setType}
          />
        </div>

        <div className="record-count">
          {filteredData.length} Records
        </div>
      </div>

      <DomesticStaffTable
        data={paginatedData}
        onEdit={onEditStaff}
        onDelete={onDeleteStaff}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}

export default DomesticStaff;