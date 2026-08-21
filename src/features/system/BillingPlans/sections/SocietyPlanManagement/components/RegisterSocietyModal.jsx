import Modal from "../../../../../../components/Common/Modal/Modal";
import Input from "../../../../../../components/Common/Input/Input";
import Select from "../../../../../../components/Common/Select/Select";
import Button from "../../../../../../components/Common/Button/Button";
import useRegisterSocietyForm
  from "../hooks/useRegisterSocietyForm";

function RegisterSocietyModal({
  open,
  onClose,
}) {
  const {
    form,
    setField,
    registerSociety,
  } = useRegisterSocietyForm(onClose);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Register new society"
    >
      <div className="modal-body">

        {/* Society Name */}
        <div className="form-group">
          <Input
            label="SOCIETY NAME"
            value={form.societyName}
            onChange={(e) =>
              setField(
                "societyName",
                e.target.value
              )
            }
          />
        </div>

        {/* City + Registration Number */}
        <div className="form-grid">

          <div className="form-group">
            <Input
              label="CITY"
              value={form.city}
              onChange={(e) =>
                setField(
                  "city",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <Input
              label="REGISTRATION NUMBER"
              value={form.registrationNumber}
              onChange={(e) =>
                setField(
                  "registrationNumber",
                  e.target.value
                )
              }
            />
          </div>

        </div>

        {/* State + Country */}
        <div className="form-grid">

          <div className="form-group">
            <Input
              label="STATE"
              value={form.state}
              onChange={(e) =>
                setField(
                  "state",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <Input
              label="COUNTRY"
              value={form.country}
              onChange={(e) =>
                setField(
                  "country",
                  e.target.value
                )
              }
            />
          </div>

        </div>

        {/* Towers + Units */}
        <div className="form-grid">

          <div className="form-group">
            <Input
              type="number"
              label="NO. OF TOWERS / BLOCKS"
              value={form.towers}
              onChange={(e) =>
                setField(
                  "towers",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <Input
              type="number"
              label="TOTAL UNITS"
              value={form.totalUnits}
              onChange={(e) =>
                setField(
                  "totalUnits",
                  e.target.value
                )
              }
            />
          </div>

        </div>

        {/* Plan Tier */}
        <div className="form-group">
          <Select
            label="PLAN TIER"
            value={form.planTier}
            onChange={(value) =>
              setField("planTier", value)
            }
            options={[
              {
                value: "Free trial",
                label: "Free trial",
              },
              {
                value: "Starter",
                label: "Starter",
              },
              {
                value: "Pro",
                label: "Pro",
              },
              {
                value: "Enterprise",
                label: "Enterprise",
              },
            ]}
          />
        </div>

        {/* Society Admin Name */}
        <div className="form-group">
          <Input
            label="SOCIETY ADMIN — NAME"
            value={form.adminName}
            onChange={(e) =>
              setField(
                "adminName",
                e.target.value
              )
            }
          />
        </div>

        {/* Admin Role + Phone */}
        <div className="form-grid">

          <div className="form-group">
            <Select
              label="SOCIETY ADMIN — ROLE"
              value={form.adminRole}
              onChange={(value) =>
                setField(
                  "adminRole",
                  value
                )
              }
              options={[
                {
                  value: "Committee Secretary",
                  label: "Committee Secretary",
                },
                {
                  value: "President",
                  label: "President",
                },
                {
                  value: "Treasurer",
                  label: "Treasurer",
                },
                {
                  value: "Society Manager",
                  label: "Society Manager",
                },
              ]}
            />
          </div>

          <div className="form-group">
            <Input
              label="SOCIETY ADMIN — PHONE"
              value={form.adminPhone}
              onChange={(e) =>
                setField(
                  "adminPhone",
                  e.target.value
                )
              }
            />
          </div>

        </div>

        {/* Admin Email */}
        <div className="form-group">
          <Input
            label="SOCIETY ADMIN — EMAIL"
            value={form.adminEmail}
            onChange={(e) =>
              setField(
                "adminEmail",
                e.target.value
              )
            }
          />
        </div>

      </div>

      <div className="modal-footer">

        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button onClick={registerSociety}>
          Register society
        </Button>

      </div>
    </Modal>
  );
}

export default RegisterSocietyModal;