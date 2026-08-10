import type { Task } from "../components/TaskList"

export const ADD_TASK = "ADD_TASK"
export const UPDATE_TASK = "UPDATE_TASK"
export const DELETE_TASK = "DELETE_TASK"
export const TOGGLE_TASK = "TOGGLE_TASK"
export const SET_TASKS = "SET_TASKS"

export interface TaskAction {
  type: string
  payload?: unknown
}

export function taskReducer(
  state: Task[],
  action: TaskAction
): Task[] {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload as Task]

    case UPDATE_TASK: {
      const payload = action.payload as {
        id: string | number
        updates: Partial<Task>
      }

      return state.map((task) =>
        task.id === payload.id
          ? { ...task, ...payload.updates }
          : task
      )
    }

    case DELETE_TASK:
      return state.filter(
        (task) =>
          task.id !==
          (action.payload as string | number)
      )

    case TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )

    case SET_TASKS:
      return action.payload as Task[]

    default:
      return state
  }
}