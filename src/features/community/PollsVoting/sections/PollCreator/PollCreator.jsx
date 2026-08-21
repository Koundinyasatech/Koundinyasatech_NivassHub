import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import usePollCreator from "./hooks/usePollCreator";

import PollCreatorTable from "./components/PollCreatorTable";
import PollCreatorFilters from "./components/PollCreatorFilters";

function PollCreator() {
  const { polls } = usePollCreator();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const statusOptions = [
    {
      label: "All Status",
      value: "",
    },
    {
      label: "Open",
      value: "Open",
    },
    {
      label: "Closed",
      value: "Closed",
    },
    {
      label: "Draft",
      value: "Draft",
    },
  ];

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return polls.filter((item) => {
      const matchesSearch = [
        item.question,
        item.type,
        item.audience,
        item.status,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(keyword)
      );

      const matchesStatus =
        status === ""
          ? true
          : item.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [polls, search, status]);

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

  const handleView = (poll) => {
    console.log("View", poll);
  };

  const handleEdit = (poll) => {
    console.log("Edit", poll);
  };

  const handleClose = (poll) => {
    console.log("Close", poll);
  };

  return (
    <Card>
      <PollCreatorFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        statusOptions={statusOptions}
      />

      <PollCreatorTable
        data={paginatedData}
        onView={handleView}
        onEdit={handleEdit}
        onClose={handleClose}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}

export default PollCreator;