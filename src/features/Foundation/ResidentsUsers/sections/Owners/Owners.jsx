import { useEffect, useMemo, useState } from "react";

import Card from "../../../../../components/Common/Card/Card";
import Input from "../../../../../components/Common/Input/Input";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

import OwnerTable from "../../components/OwnerTable";

function Owners({
    owners,
    onEdit,
}) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const pageSize = 5;

    const filteredData = useMemo(() => {
        const searchText = search.toLowerCase();

        return owners.filter((owner) =>
            owner.name?.toLowerCase().includes(searchText) ||
            owner.unit?.toString().toLowerCase().includes(searchText) ||
            owner.phone?.toString().toLowerCase().includes(searchText) ||
            owner.email?.toLowerCase().includes(searchText)
        );
    }, [owners, search]);

    // Reset to first page when search changes
    useEffect(() => {
        setPage(1);
    }, [search]);

    const totalPages = Math.ceil(
        filteredData.length / pageSize
    );

    // Keep page within valid range
    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;

        return filteredData.slice(
            start,
            start + pageSize
        );
    }, [filteredData, page]);

    return (
        <Card>
            <div className="tower-toolbar">
                <div className="tower-search">
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>

                <div className="record-count">
                    {filteredData.length} Records
                </div>
            </div>

            <OwnerTable
                data={paginatedData}
                onEdit={onEdit}
            />

            {totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            )}
        </Card>
    );
}

export default Owners;