import Input from "../../../../components/Common/Input/Input";

function AdminRoleFilters({
  search,
  onSearchChange,
  recordCount,
}) {
  return (
    <div className="admin-role-toolbar">
      <div className="admin-role-search">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="record-count">
        {recordCount} Records
      </div>
    </div>
  );
}

export default AdminRoleFilters;