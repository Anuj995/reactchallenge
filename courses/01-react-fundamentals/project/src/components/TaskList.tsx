import type { Dispatch, SetStateAction } from "react"
import TaskCard from "./TaskCard"

export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string | number
}

interface TaskListProps {
  tasks?: Task[]
  countText?: string
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void

  editingId?: string | number | null
  setEditingId?: Dispatch<
    SetStateAction<string | number | null>
  >

  onUpdateTask?: (
    id: string | number,
    updates: Partial<Task>
  ) => void

  linkToTaskDetail?: boolean
}

const HARDCODED_TASKS: Task[] = [
  {
    id: 1,
    title: "Task One",
    description: "First hardcoded task",
    priority: "High",
    completed: false,
    category: "Work",
    tags: ["urgent"],
  },
  {
    id: 2,
    title: "Task Two",
    description: "Second hardcoded task",
    priority: "Medium",
    completed: false,
    category: "Personal",
    tags: ["home"],
  },
  {
    id: 3,
    title: "Task Three",
    description: "Third hardcoded task",
    priority: "Low",
    completed: false,
    category: "General",
    tags: ["misc"],
  },
]

export default function TaskList({
  tasks,
  countText,
  onToggle,
  onDelete,
  editingId,
  setEditingId,
  onUpdateTask,
  linkToTaskDetail = false,
}: TaskListProps) {
  const list: Task[] = tasks ?? HARDCODED_TASKS

  return (
    <>
      {countText && (
        <p id="task-count">
          {countText}
        </p>
      )}

      <section id="task-list">
        {list.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            completed={task.completed}
            category={task.category}
            tags={task.tags}
            onToggle={onToggle}
            onDelete={onDelete}
            taskId={task.id}
            editing={editingId === task.id}
            setEditingId={setEditingId}
            onUpdateTask={onUpdateTask}
            linkToTaskDetail={linkToTaskDetail}
          />
        ))}
      </section>
    </>
  )
}