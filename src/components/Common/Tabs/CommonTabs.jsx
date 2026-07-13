import "./CommonTabs.css";

function CommonTabs({
  tabs = [],
  activeTab,
  onTabChange,
}) {
  return (
    <div className="common-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${
            activeTab === tab.id ? "active" : ""
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default CommonTabs;