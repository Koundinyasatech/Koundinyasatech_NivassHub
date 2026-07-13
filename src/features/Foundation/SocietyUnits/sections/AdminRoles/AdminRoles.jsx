import { useMemo, useState, useEffect } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import AdminRoleTable from "../../components/AdminRoleTable";

function AdminRoles({
  roles = [],
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filteredData = useMemo(() => {
    return roles.filter((item) =>
      item.user.toLowerCase().includes(search.toLowerCase())
    );
  }, [roles, search]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  return (
    <Card>
      <div className="tower-toolbar">
        <div className="tower-search">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="record-count">
          {filteredData.length} Records
        </div>
      </div>

      <AdminRoleTable
        data={paginatedData}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}

export default AdminRoles;