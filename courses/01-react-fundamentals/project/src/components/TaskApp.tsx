import {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react"
import TaskForm from "./TaskForm"
import TaskList, { type Task } from "./TaskList"
import FilterBar from "./FilterBar"

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
}: TaskAppProps) {
  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all")

  const [sort, setSort] = useState<
    "recent" | "high" | "low" | "alphabetical"
  >("recent")

  const [search, setSearch] = useState("")

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
      // ignore invalid localStorage data
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "task-app-tasks",
      JSON.stringify(tasks)
    )
  }, [tasks])

  function handleAddTask(
    task: Record<string, unknown>
  ) {
    if (setTasks) {
      setTasks((prev) => [...prev, task as Task])
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
        prev.filter((task) => task.id !== id)
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
            ? { ...task, ...updates }
            : task
        )
      )
    }

    setEditingId(null)
  }

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
          .includes(search.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(search.toLowerCase())
    )

  const sortedTasks = [
    ...searchFilteredTasks,
  ].sort((a, b) => {
    if (sort === "recent") {
      return 0
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
    <>
      <TaskForm onAddTask={handleAddTask} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        search={search}
        onSearchChange={setSearch}
      />

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
          onUpdateTask={handleUpdateTask}
        />
      )}
    </>
  )
}