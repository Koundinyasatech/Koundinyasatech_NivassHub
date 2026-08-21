import { useEffect, useRef, useState } from "react";
import "./SearchableDropdown.css";

function SearchableDropdown({
  label,
  placeholder = "Search...",
  options = [],
  value,
  onChange,
  loading = false,
  disabled = false,
  error = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dropdownRef = useRef(null);

  const selectedOption = options.find(
    (option) => String(option.value) === String(value)
  );

  const filteredOptions = options.filter((option) =>
    option.label
      ?.toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);
    setSearchValue("");
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;

    setIsOpen((previous) => !previous);
  };

  return (
    <div
      className="searchable-dropdown"
      ref={dropdownRef}
    >
      {label && (
        <label className="searchable-dropdown-label">
          {label}
        </label>
      )}

      <button
        type="button"
        className={`dropdown-control ${
          isOpen ? "dropdown-control-active" : ""
        } ${error ? "dropdown-control-error" : ""}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span
          className={
            selectedOption
              ? "dropdown-selected-value"
              : "dropdown-placeholder"
          }
        >
          {selectedOption?.label || placeholder}
        </span>

        <span
          className={`dropdown-arrow ${
            isOpen ? "dropdown-arrow-open" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-search">
            <span className="dropdown-search-icon">
              🔍
            </span>

            <input
              type="text"
              value={searchValue}
              placeholder="Search society..."
              autoFocus
              onChange={(event) =>
                setSearchValue(event.target.value)
              }
              onClick={(event) =>
                event.stopPropagation()
              }
            />
          </div>

          <div className="dropdown-options">
            {loading ? (
              <div className="dropdown-message">
                Loading societies...
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="dropdown-message">
                No societies found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`dropdown-option ${
                    String(option.value) === String(value)
                      ? "dropdown-option-selected"
                      : ""
                  }`}
                  onClick={() =>
                    handleSelect(option)
                  }
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && (
        <span className="dropdown-error-text">
          {error}
        </span>
      )}
    </div>
  );
}

export default SearchableDropdown;