import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type Theme = "light" | "dark"

export interface ThemeContextType {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  toggleTheme: () => void
}

export const ThemeContext =
  createContext<ThemeContextType | null>(null)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] =
    useState<Theme>("light")

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("task-app-theme")

    if (
      savedTheme === "light" ||
      savedTheme === "dark"
    ) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "task-app-theme",
      theme
    )
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light"
        ? "dark"
        : "light"
    )
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}