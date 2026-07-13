import { useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import FamilyMemberCard from "../../components/FamilyMemberCard";

function FamilyMembers({
  familyMembers,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return familyMembers.filter((family) => {
      const unitMatch = family.unit
        .toLowerCase()
        .includes(keyword);

      const emergencyMatch =
        family.emergencyContact.includes(search);

      const memberMatch = family.members.some(
        (member) =>
          member.name
            .toLowerCase()
            .includes(keyword) ||
          member.relation
            .toLowerCase()
            .includes(keyword)
      );

      return (
        unitMatch ||
        emergencyMatch ||
        memberMatch
      );
    });
  }, [familyMembers, search]);

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
          {filteredData.length} Units
        </div>
      </div>

      {paginatedData.map((family) => (
        <FamilyMemberCard
          key={family.id}
          family={family}
        />
      ))}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}

export default FamilyMembers;