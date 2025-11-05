import { useState } from "react";

export function useFilters() {
  const [search, setSearch] = useState("");
  const [showAvailable, setShowAvailable] = useState(true);

  const clearFilters = () => {
    setSearch("");
    setShowAvailable(true);
  };

  return {
    // Filter state
    search,
    showAvailable,

    // Filter actions
    setSearch,
    setShowAvailable,
    clearFilters,
  };
}
