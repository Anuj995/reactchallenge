import { useState, type Dispatch, type SetStateAction } from "react"
import TaskForm from "./TaskForm"
import TaskList, { type Task } from "./TaskList"
import FilterBar from "./FilterBar"

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
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
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  function handleAddTask(task: Record<string, unknown>) {
    if (setTasks) {
      setTasks((prev) => [...prev, task as Task])
    }
  }

  function handleToggle(id: string | number) {
    if (setTasks) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed }
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

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "active"
      ? tasks.filter((task) => !task.completed)
      : tasks.filter((task) => task.completed)

  return (
    <>
      <TaskForm onAddTask={handleAddTask} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
      />

      <p id="task-count">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>

      {filteredTasks.length === 0 ? (
        <p id="filter-empty-message">
          No tasks match this filter
        </p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </>
  )
}