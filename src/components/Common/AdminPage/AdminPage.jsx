import "./AdminPage.css";

import Breadcrumb from "../Breadcrumb/Breadcrumb";
import PageHeader from "../PageHeader/PageHeader";
import CommonTabs from "../Tabs/CommonTabs";

function AdminPage({
  breadcrumb = [],
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