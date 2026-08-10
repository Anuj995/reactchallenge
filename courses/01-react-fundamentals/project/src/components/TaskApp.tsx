import {
  useState,
  useEffect,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react"

import TaskForm from "./TaskForm"
import TaskList, { type Task } from "./TaskList"
import FilterBar from "./FilterBar"
import StatsPanel from "./StatsPanel"
import { useTheme } from "../contexts/ThemeContext"

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: {
    type: string
    payload?: unknown
  }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp({
  tasks = [],
  setTasks,
  showForm = true,
  showFilterBar = true,
  showStatsPanel = true,
}: TaskAppProps) {
  const { theme, toggleTheme } = useTheme()

  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all")

  const [sort, setSort] = useState<
    | "recent"
    | "high"
    | "low"
    | "alphabetical"
    | "dueDate"
  >("recent")

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] =
    useState("")
  const [isSearching, setIsSearching] =
    useState(false)

  const [editingId, setEditingId] = useState<
    string | number | null
  >(null)

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(
        "task-app-tasks"
      )

      if (savedTasks && setTasks) {
        const parsedTasks = JSON.parse(
          savedTasks
        ) as Task[]

        setTasks(parsedTasks)
      }
    } catch {
      // ignore invalid data
    }
  }, [setTasks])

  useEffect(() => {
    localStorage.setItem(
      "task-app-tasks",
      JSON.stringify(tasks)
    )
  }, [tasks])

  useEffect(() => {
    setIsSearching(true)

    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  function handleAddTask(task: Task) {
    if (setTasks) {
      setTasks((prev) => [...prev, task])
    }
  }

  function handleToggle(id: string | number) {
    if (setTasks) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                completed: !task.completed,
              }
            : task
        )
      )
    }
  }

  function handleDelete(id: string | number) {
    if (setTasks) {
      setTasks((prev) =>
        prev.filter(
          (task) => task.id !== id
        )
      )
    }
  }

  function handleUpdateTask(
    id: string | number,
    updates: Partial<Task>
  ) {
    if (setTasks) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                ...updates,
              }
            : task
        )
      )
    }

    setEditingId(null)
  }

  const stats = useMemo(() => {
    const total = tasks.length

    const completed = tasks.filter(
      (task) => task.completed
    ).length

    const active = total - completed

    const overdue = tasks.filter(
      (task) => {
        if (
          !task.dueDate ||
          task.completed
        ) {
          return false
        }

        return (
          new Date(task.dueDate) <
          new Date()
        )
      }
    ).length

    const completedPercentage =
      total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
          )

    return {
      total,
      completed,
      active,
      overdue,
      completedPercentage,
    }
  }, [tasks])

  const statusFilteredTasks =
    filter === "all"
      ? tasks
      : filter === "active"
      ? tasks.filter(
          (task) => !task.completed
        )
      : tasks.filter(
          (task) => task.completed
        )

  const searchFilteredTasks =
    statusFilteredTasks.filter(
      (task) =>
        task.title
          .toLowerCase()
          .includes(
            debouncedSearch.toLowerCase()
          ) ||
        task.description
          .toLowerCase()
          .includes(
            debouncedSearch.toLowerCase()
          )
    )

  const sortedTasks = [
    ...searchFilteredTasks,
  ].sort((a, b) => {
    if (sort === "recent") {
      return 0
    }

    if (sort === "dueDate") {
      if (!a.dueDate && !b.dueDate) {
        return 0
      }

      if (!a.dueDate) {
        return 1
      }

      if (!b.dueDate) {
        return -1
      }

      return (
        new Date(
          a.dueDate
        ).getTime() -
        new Date(
          b.dueDate
        ).getTime()
      )
    }

    if (sort === "alphabetical") {
      return a.title.localeCompare(
        b.title,
        undefined,
        {
          sensitivity: "base",
        }
      )
    }

    const priorityValue = {
      High: 3,
      Medium: 2,
      Low: 1,
    }

    if (sort === "high") {
      return (
        priorityValue[
          b.priority as keyof typeof priorityValue
        ] -
        priorityValue[
          a.priority as keyof typeof priorityValue
        ]
      )
    }

    return (
      priorityValue[
        a.priority as keyof typeof priorityValue
      ] -
      priorityValue[
        b.priority as keyof typeof priorityValue
      ]
    )
  })

  return (
    <div
      data-theme={theme}
      style={{
        backgroundColor:
          theme === "dark"
            ? "#1e1e1e"
            : "#ffffff",
        color:
          theme === "dark"
            ? "#ffffff"
            : "#000000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <button
        id="theme-toggle"
        onClick={toggleTheme}
      >
        {theme === "dark"
          ? "Light Mode"
          : "Dark Mode"}
      </button>

      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
        />
      )}

      {showStatsPanel && (
        <StatsPanel
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
          overdue={stats.overdue}
          completedPercentage={
            stats.completedPercentage
          }
        />
      )}

      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortChange={setSort}
          search={search}
          onSearchChange={setSearch}
        />
      )}

      {isSearching && (
        <p id="searching-indicator">
          Searching...
        </p>
      )}

      <p id="task-count">
        Showing {sortedTasks.length} of{" "}
        {tasks.length} tasks
      </p>

      {sortedTasks.length === 0 ? (
        <p id="filter-empty-message">
          No tasks found
        </p>
      ) : (
        <TaskList
          tasks={sortedTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          editingId={editingId}
          setEditingId={setEditingId}
          onUpdateTask={
            handleUpdateTask
          }
        />
      )}
    </div>
  )
}