
import Input from "../../../../components/Common/Input/Input";
import Select from "../../../../components/Common/Select/Select";

function UnitForm({
  formData,
  errors,
  onChange,
  towerOptions = [],
}) {
  const statusOptions = [
    { label: "Occupied", value: "Occupied" },
    { label: "Vacant", value: "Vacant" },
    { label: "Maintenance", value: "Maintenance" },
  ];

  const unitTypeOptions = [
    { label: "1 BHK", value: "1 BHK" },
    { label: "2 BHK", value: "2 BHK" },
    { label: "3 BHK", value: "3 BHK" },
    { label: "4 BHK", value: "4 BHK" },
  ];

  return (
    <div className="form-grid">
      <div className="form-group">
        <Select
          label="Tower"
          value={formData.tower}
          options={towerOptions}
          error={errors.tower}
          onChange={(value) => onChange("tower", value)}
        />
      </div>

      <div className="form-group">
        <Input
          label="Unit Number"
          value={formData.unitNumber}
          error={errors.unitNumber}
          onChange={(e) => onChange("unitNumber", e.target.value)}
        />
      </div>

      <div className="form-group">
        <Input
          type="number"
          label="Floor"
          value={formData.floor}
          error={errors.floor}
          onChange={(e) => onChange("floor", e.target.value)}
        />
      </div>

      <div className="form-group">
        <Select
          label="Unit Type"
          value={formData.type}
          options={unitTypeOptions}
          error={errors.type}
          onChange={(value) => onChange("type", value)}
        />
      </div>

      <div className="form-group">
        <Input
          label="Area (Sq.ft)"
          value={formData.area}
          error={errors.area}
          onChange={(e) => onChange("area", e.target.value)}
        />
      </div>

      <div className="form-group">
        <Select
          label="Status"
          value={formData.status}
          options={statusOptions}
          error={errors.status}
          onChange={(value) => onChange("status", value)}
        />
      </div>
    </div>
  );
}

export default UnitForm;