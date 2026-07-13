import Input from "../../../../components/Common/Input/Input";

function TowerForm({
  formData,
  errors,
  onChange,
}) {
  return (
    <div className="tower-form">

      <div className="form-grid">

        <div className="form-group">
          <Input
            label="Tower Name"
            placeholder="Enter tower name"
            value={formData.towerName}
            onChange={(e) =>
              onChange("towerName", e.target.value)
            }
            error={errors.towerName}
            required
          />
        </div>

        <div className="form-group">
          <Input
            label="No. of Wings"
            type="number"
            placeholder="Enter wings"
            value={formData.wings}
            onChange={(e) =>
              onChange("wings", e.target.value)
            }
            error={errors.wings}
            required
          />
        </div>

        <div className="form-group">
          <Input
            label="No. of Floors"
            type="number"
            placeholder="Enter floors"
            value={formData.floors}
            onChange={(e) =>
              onChange("floors", e.target.value)
            }
            error={errors.floors}
            required
          />
        </div>

        <div className="form-group">
          <Input
            label="Naming Convention"
            placeholder="Example: A-<floor><unit>"
            value={formData.namingConvention}
            onChange={(e) =>
              onChange("namingConvention", e.target.value)
            }
            error={errors.namingConvention}
            required
          />
        </div>

      </div>

    </div>
  );
}

export default TowerForm;