import { useEffect, useState } from 'react'

interface TableUrlState {
  page: number
  pageSize: number
  sort?: string
  filters?: Record<string, string[]>
}

export function useTableUrlState(prefix: string): [TableUrlState, (state: Partial<TableUrlState>) => void] {
  const [state, setState] = useState<TableUrlState>({ page: 0, pageSize: 10 })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const page = parseInt(params.get(`${prefix}.page`) ?? '0', 10)
    const pageSize = parseInt(params.get(`${prefix}.pageSize`) ?? '10', 10)
    const sort = params.get(`${prefix}.sort`) ?? undefined
    setState({ page: isNaN(page) ? 0 : page, pageSize: isNaN(pageSize) ? 10 : pageSize, sort })
  }, [prefix])

  const updateState = (newState: Partial<TableUrlState>) => {
    setState((prev) => {
      const merged = { ...prev, ...newState }
      const params = new URLSearchParams(window.location.search)
      if (merged.page !== 0) params.set(`${prefix}.page`, String(merged.page))
      else params.delete(`${prefix}.page`)
      if (merged.pageSize !== 10) params.set(`${prefix}.pageSize`, String(merged.pageSize))
      else params.delete(`${prefix}.pageSize`)
      if (merged.sort) params.set(`${prefix}.sort`, merged.sort)
      else params.delete(`${prefix}.sort`)
      window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
      return merged
    })
  }

  return [state, updateState]
}
