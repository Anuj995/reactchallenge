import { useEffect, useState } from "react"

interface Todo {
  id: number
  title: string
}

export default function FetchDemoView() {
  const [items, setItems] = useState<Todo[]>([])
  const [loading, setLoading] =
    useState(true)

  const [error, setError] = useState<
    string | null
  >(null)

  useEffect(() => {
    const controller =
      new AbortController()

    async function loadTodos() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          "/api/todos.json",
          {
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error(
            "Failed to fetch data"
          )
        }

        const data =
          await response.json()

        setItems(data)
      } catch (err) {
        if (
          err instanceof Error &&
          err.name !== "AbortError"
        ) {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    loadTodos()

    return () => {
      controller.abort()
    }
  }, [])

  if (loading) {
    return (
      <div id="fetch-loading">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div id="fetch-error">
        {error}
      </div>
    )
  }

  return (
    <ul id="fetch-list">
      {items.map((item) => (
        <li key={item.id}>
          {item.title}
        </li>
      ))}
    </ul>
  )
}