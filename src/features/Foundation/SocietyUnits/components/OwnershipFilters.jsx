import Input from "../../../../components/Common/Input/Input";

function OwnershipFilters({
  search,
  onSearchChange,
  recordCount,
}) {
  return (
    <div className="ownership-toolbar">
      <div className="ownership-search">
        <Input
          placeholder="Search by Unit, Owner or Co-Owner..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      <div className="record-count">
        {recordCount} Records
      </div>
    </div>
  );
}

export default OwnershipFilters;