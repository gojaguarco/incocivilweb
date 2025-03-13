"use client"

import { useState, useEffect } from "react"

// Custom hook for working with localStorage
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Initialize the state
  useEffect(() => {
    try {
      // Check if running in browser
      if (typeof window === "undefined") {
        return
      }

      // Get from localStorage by key
      const item = window.localStorage.getItem(key)

      // Parse stored json or return initialValue if null
      setStoredValue(item ? JSON.parse(item) : initialValue)
    } catch (error) {
      // If error, return initialValue
      console.error(error)
      setStoredValue(initialValue)
    }
  }, [key, initialValue])

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T) => {
    try {
      // Check if running in browser
      if (typeof window === "undefined") {
        return
      }

      // Save state
      setStoredValue(value)

      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

