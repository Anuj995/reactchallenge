import type { Dispatch, SetStateAction } from "react"
import TaskForm from "./TaskForm"
import TaskList, { type Task } from "./TaskList"

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

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length

  return (
    <>
      <TaskForm onAddTask={handleAddTask} />

      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        countText={`${completedCount} of ${tasks.length} completed`}
      />
    </>
  )
}