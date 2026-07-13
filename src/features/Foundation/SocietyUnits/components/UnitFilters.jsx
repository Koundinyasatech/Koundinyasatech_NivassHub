import Input from "../../../../components/Common/Input/Input";
import Select from "../../../../components/Common/Select/Select";

function UnitFilters({
  search,
  onSearchChange,
  tower,
  onTowerChange,
  status,
  onStatusChange,
  towerOptions,
  recordCount,
}) {
  const statusOptions = [
    {
      label: "All Statuses",
      value: "",
    },
    {
      label: "Occupied",
      value: "Occupied",
    },
    {
      label: "Vacant",
      value: "Vacant",
    },
    {
      label: "Locked",
      value: "Locked",
    },
  ];

  return (
    <div className="unit-toolbar">
      <div className="unit-toolbar-left">
        <div className="unit-search">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="unit-filter">
          <Select
            value={tower}
            options={[
              {
                label: "All Towers",
                value: "",
              },
              ...towerOptions,
            ]}
            onChange={(value) => onTowerChange(value)}
          />
        </div>

        <div className="unit-filter">
          <Select
            value={status}
            options={statusOptions}
            onChange={(value) => onStatusChange(value)}
          />
        </div>
      </div>

      <div className="record-count">
        {recordCount} Records
      </div>
    </div>
  );
}

export default UnitFilters;