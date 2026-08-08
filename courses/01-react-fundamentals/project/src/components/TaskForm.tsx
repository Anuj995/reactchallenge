import { useState } from "react"

interface TaskFormProps {
  onAddTask?: (task: Record<string, unknown>) => void
}

export default function TaskForm({
  onAddTask,
}: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] =
    useState("Medium")
  const [category, setCategory] =
    useState("General")
  const [tags, setTags] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(
    e: React.FormEvent
  ) {
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
      category,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      dueDate: dueDate || undefined,
    }

    onAddTask?.(newTask)

    setTitle("")
    setDescription("")
    setPriority("Medium")
    setCategory("General")
    setTags("")
    setDueDate("")
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
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">
          Medium
        </option>
        <option value="High">High</option>
      </select>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="General">
          General
        </option>
        <option value="Work">Work</option>
        <option value="Personal">
          Personal
        </option>
      </select>

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) =>
          setTags(e.target.value)
        }
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      <button type="submit">
        Add Task
      </button>
    </form>
  )
}