import { useParams, useNavigate } from "react-router-dom"

interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
}

export default function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const storedTasks = localStorage.getItem(
    "task-app-tasks"
  )

  let tasks: Task[] = []

  try {
    tasks = storedTasks
      ? JSON.parse(storedTasks)
      : []
  } catch {
    tasks = []
  }

  const task = tasks.find(
    (t) => String(t.id) === String(id)
  )

  return (
    <div id="task-detail-page">
      <button
        id="task-detail-back"
        onClick={() =>
          navigate("/challenge/21-react-router")
        }
      >
        Back to list
      </button>

      {task ? (
        <>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>
            Status:{" "}
            {task.completed
              ? "Completed"
              : "Pending"}
          </p>
        </>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  )
}