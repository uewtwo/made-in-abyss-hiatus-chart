import { useSyncExternalStore } from "react"

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function getSnapshot() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function getServerSnapshot() {
  return false
}

export const useSelectThemeMode = (): "dark" | "light" => {
  const isDarkMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return isDarkMode ? "dark" : "light"
}
