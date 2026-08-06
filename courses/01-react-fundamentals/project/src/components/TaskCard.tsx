import { useEffect, useState } from "react"

interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  taskId?: string | number

  editing?: boolean
  setEditingId?: React.Dispatch<
    React.SetStateAction<string | number | null>
  >

  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => void
}

export default function TaskCard({
  title,
  description,
  priority,
  completed = false,
  onToggle,
  onDelete,
  taskId,
  editing = false,
  setEditingId,
  onUpdateTask,
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [editPriority, setEditPriority] = useState(priority)

  useEffect(() => {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)
  }, [title, description, priority, editing])

  function handleDelete() {
    if (onDelete && window.confirm("Are you sure?")) {
      onDelete(taskId!)
    }
  }

  function handleSave() {
    if (!editTitle.trim()) return

    onUpdateTask?.(taskId!, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    })

    setEditingId?.(null)
  }

  function handleCancel() {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)
    setEditingId?.(null)
  }

  if (editing) {
    return (
      <article id="task-card">
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />

        <select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={handleSave}>
          Save
        </button>

        <button onClick={handleCancel}>
          Cancel
        </button>
      </article>
    )
  }

  return (
    <article
      id="task-card"
      data-completed={completed}
      style={{
        backgroundColor: completed ? "#d4edda" : "white",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {onToggle && (
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(taskId!)}
        />
      )}

      <h2
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {description}
      </p>

      <p>Priority: {priority}</p>

      <button onClick={() => setEditingId?.(taskId!)}>
        Edit
      </button>

      {onDelete && (
        <button onClick={handleDelete}>
          Delete
        </button>
      )}
    </article>
  )
}