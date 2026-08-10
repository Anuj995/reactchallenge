import {
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react"

import useLocalStorage from "../hooks/useLocalStorage"

export type Theme = "light" | "dark"

export interface ThemeContextType {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
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
    useLocalStorage<Theme>(
      "task-app-theme",
      "light"
    )

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light"
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