import SearchBox from "../../../../../../components/Common/SearchBar/SearchBar";

function AGMResolutionFilters({
  search,
  setSearch,
}) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <SearchBox
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        width="335px"
      />
    </div>
  );
}

export default AGMResolutionFilters;