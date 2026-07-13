import Input from "../../../../components/Common/Input/Input";
import Select from "../../../../components/Common/Select/Select";

const statusOptions = [
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Inactive",
    value: "Inactive",
  },
];

function OwnerProfile({
  owner,
  formData,
  errors,
  onChange,
}) {
  if (!owner) return null;

  const initials = owner.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <div className="owner-profile-header">
        <div className="owner-avatar">
          {initials}
        </div>

        <div>
          <h3>{owner.name}</h3>
          <p>Unit {owner.unit}</p>
        </div>
      </div>

      <Input
        label="Phone"
        value={formData.phone}
        onChange={(e) =>
          onChange("phone", e.target.value)
        }
        error={errors.phone}
      />

      <Input
        label="Email"
        value={formData.email}
        onChange={(e) =>
          onChange("email", e.target.value)
        }
        error={errors.email}
      />

      <Select
        label="Status"
        value={formData.status}
        options={statusOptions}
        onChange={(value) =>
          onChange("status", value)
        }
        error={errors.status}
      />
    </>
  );
}

export default OwnerProfile;