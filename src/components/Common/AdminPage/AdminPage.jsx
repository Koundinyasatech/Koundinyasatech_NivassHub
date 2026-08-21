import "./AdminPage.css";

import Breadcrumb from "../Breadcrumb/Breadcrumb";
import PageHeader from "../PageHeader/PageHeader";
import CommonTabs from "../Tabs/CommonTabs";

function AdminPage({
  breadcrumb = [],
  contextBar,
  title,
  subtitle,
  action,
  tabs = [],
  activeTab,
  onTabChange,
  children,
}) {
  return (
    <div className="admin-page">

      <Breadcrumb items={breadcrumb} />

      {contextBar && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "fit-content",
            marginBottom: "8px",
            padding: "8px 14px",
            borderRadius: "8px",
            background: "#e5e7eb",
            fontSize: "14px",
          }}
        >
          {contextBar}
        </div>
      )}

      <PageHeader
        title={title}
        subtitle={subtitle}
        action={action}
      />

      {tabs.length > 0 && (
        <CommonTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      )}

      <div className="admin-page-content">
        {children}
      </div>

    </div>
  );
}

export default AdminPage;