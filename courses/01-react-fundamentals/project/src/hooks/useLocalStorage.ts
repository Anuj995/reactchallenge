import {
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)

      if (item !== null) {
        return JSON.parse(item) as T
      }

      return initialValue
    } catch {
      return initialValue
    }
  })

  const setStoredValue: Dispatch<
    SetStateAction<T>
  > = (newValue) => {
    setValue((prev) => {
      const valueToStore =
        typeof newValue === "function"
          ? (
              newValue as (
                prev: T
              ) => T
            )(prev)
          : newValue

      try {
        localStorage.setItem(
          key,
          JSON.stringify(
            valueToStore
          )
        )
      } catch {
        // Ignore storage errors
      }

      return valueToStore
    })
  }

  return [value, setStoredValue]
}