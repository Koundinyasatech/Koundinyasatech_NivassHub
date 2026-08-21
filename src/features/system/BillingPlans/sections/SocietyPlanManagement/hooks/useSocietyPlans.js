import { useMemo, useState } from "react";
import { societyPlanData } from "../data/societyPlanData";

function useSocietyPlans() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredSocieties = useMemo(() => {
    return societyPlanData.filter((society) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        society.society.toLowerCase().includes(searchValue) ||
        society.city.toLowerCase().includes(searchValue);

      const matchesPlan =
        !planFilter || society.plan === planFilter;

      const matchesStatus =
        !statusFilter || society.status === statusFilter;

      return (
        matchesSearch &&
        matchesPlan &&
        matchesStatus
      );
    });
  }, [search, planFilter, statusFilter]);

  return {
    search,
    setSearch,
    planFilter,
    setPlanFilter,
    statusFilter,
    setStatusFilter,
    filteredSocieties,
  };
}

export default useSocietyPlans;