import { useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import VideoIntercomTable from "./components/VideoIntercomTable";
import EditVideoIntercomModal from "./components/EditVideoIntercomModal";

import videoIntercomColumns from "./constants/videoIntercomColumns";
import videoIntercomData from "./data/videoIntercomData";

function VideoIntercomSettings() {
  const [search, setSearch] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedIntercom, setSelectedIntercom] = useState(null);

  const filteredData = videoIntercomData.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.unit.toLowerCase().includes(searchText) ||
      item.guardPost.toLowerCase().includes(searchText)
    );
  });

  const handleEdit = (row) => {
    setSelectedIntercom(row);
    setIsEditOpen(true);
  };

  const handleClose = () => {
    setIsEditOpen(false);
    setSelectedIntercom(null);
  };

  return (
    <>
      <Card>
        {/* Search + Records */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <SearchBar
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <span>{filteredData.length} Records</span>
        </div>

        <VideoIntercomTable
          columns={videoIntercomColumns}
          data={filteredData}
          onEdit={handleEdit}
        />

        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </Card>

      <EditVideoIntercomModal
        open={isEditOpen}
        data={selectedIntercom}
        onClose={handleClose}
      />
    </>
  );
}

export default VideoIntercomSettings;