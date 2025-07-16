import { useEffect, useState } from 'react'
import { Entity } from '../types/types'

export function useGetEntities() {
  // State holds an array of entities, initialized as empty
  const [entities, setEntities] = useState<Entity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchEntities() {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch from the root endpoint for the full list
        const response = await fetch('/api/entities')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setEntities(data)
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error('An unknown error occurred'),
        )
      } finally {
        setIsLoading(false)
      }
    }
    fetchEntities()

  },

    []) // Empty dependency array means this runs once on mount

  return { entities, isLoading, error }
}
