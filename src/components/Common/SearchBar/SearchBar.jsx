import "./SearchBar.css";

function SearchBox({
  value,
  onChange,
  placeholder = "Search...",
  width = "320px",
  showIcon = false,
}) {
  return (
    <div className="search-box" style={{ width }}>
      {showIcon && (
        <span className="search-icon">🔍</span>
      )}

      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBox;