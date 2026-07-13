import Input from "../../../../components/Common/Input/Input";
import Select from "../../../../components/Common/Select/Select";

import { roleOptions } from "../constants/roleOptions";
import { scopeOptions } from "../constants/scopeOptions";

function AdminRoleForm({
    formData,
    errors,
    onChange,
}) {
    return (
        <div className="form-grid">
            <Input
                label="User Name"
                value={formData.user}
                onChange={(e) =>
                    onChange("user", e.target.value)
                }
                error={errors.user}
            />
            <Select
                label="Role"
                value={formData.role}
                options={roleOptions}
                placeholder="Select Role"
                onChange={(value) => onChange("role", value)}
                error={errors.role}
            />

            <Select
                label="Scope"
                value={formData.scope}
                options={scopeOptions}
                placeholder="Select Scope"
                onChange={(value) => onChange("scope", value)}
                error={errors.scope}
            />
        </div>
    );
}

export default AdminRoleForm;