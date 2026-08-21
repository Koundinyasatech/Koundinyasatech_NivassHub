import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";

function PollCreatorFilters({
  search,
  setSearch,
  status,
  setStatus,
  statusOptions,
}) {
  return (
    <div
      className="tower-toolbar"
    >
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
            placeholder="Search Poll..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        <Select
          value={status}
          options={
            statusOptions
          }
          placeholder="All Status"
          onChange={
            setStatus
          }
        />
      </div>
    </div>
  );
}

export default PollCreatorFilters;