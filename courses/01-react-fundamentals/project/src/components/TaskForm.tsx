import {  useState} from "react"

interface TaskFormProps {
  onAddTask?: (task: Record<string, unknown>) => void
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setError("")

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
    }

    onAddTask?.(newTask)

    setTitle("")
    setDescription("")
    setPriority("Medium")
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}

      <input
        id="task-title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">
        Add Task
      </button>
    </form>
  )
}
