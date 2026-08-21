import { useState } from "react";

import Card from "../../../../../../components/Common/Card/Card";
import Button from "../../../../../../components/Common/Button/Button";
import ToggleSwitch from "../../../../../../components/Common/ToggleSwitch/ToggleSwitch";

function ReminderSettings({
  settings = [],
}) {
  const [reminders, setReminders] =
    useState(settings);

  return (
    <Card>
      {reminders.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "36px",
          }}
        >
          <ToggleSwitch
            checked={item.enabled}
            onChange={(checked) => {
              setReminders((prev) =>
                prev.map((reminder) =>
                  reminder.id === item.id
                    ? {
                        ...reminder,
                        enabled: checked,
                      }
                    : reminder
                )
              );
            }}
          />

          <div>
            <div
              style={{
                fontSize: "17px",
                fontWeight: "600",
                color: "#111827",
              }}
            >
              {item.title}
            </div>

            {item.description && (
              <div
                style={{
                  marginTop: "4px",
                  fontSize: "15px",
                  color: "#6B7280",
                }}
              >
                {item.description}
              </div>
            )}
          </div>
        </div>
      ))}

      <div
        style={{
          borderTop: "1px solid #E5E7EB",
          marginTop: "12px",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: "180px" }}>
          <Button>
            Save Thresholds
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ReminderSettings;