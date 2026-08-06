interface FilterBarProps {
  filter: "all" | "active" | "completed"
  onFilterChange: (filter: "all" | "active" | "completed") => void

  sort: "recent" | "high" | "low" | "alphabetical"
  onSortChange: (
    sort: "recent" | "high" | "low" | "alphabetical"
  ) => void
}

export default function FilterBar({
  filter,
  onFilterChange,
  sort,
  onSortChange,
}: FilterBarProps) {
  return (
    <div id="filter-bar">
      <button
        data-active={filter === "all"}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>

      <button
        data-active={filter === "active"}
        onClick={() => onFilterChange("active")}
      >
        Active
      </button>

      <button
        data-active={filter === "completed"}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>

      <select
        id="sort-order"
        value={sort}
        onChange={(e) =>
          onSortChange(
            e.target.value as
              | "recent"
              | "high"
              | "low"
              | "alphabetical"
          )
        }
      >
        <option value="recent">Recently Added</option>
        <option value="high">Priority: High to Low</option>
        <option value="low">Priority: Low to High</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  )
}