import { useEffect, useState } from 'react'

export function useMinimumLoadingTime(isLoading: boolean, minTime = 300): boolean {
  const [showLoading, setShowLoading] = useState(isLoading)

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true)
      return
    }
    const timer = setTimeout(() => setShowLoading(false), minTime)
    return () => clearTimeout(timer)
  }, [isLoading, minTime])

  return showLoading
}
