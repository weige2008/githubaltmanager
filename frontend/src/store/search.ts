import { create } from 'zustand'

export interface SearchResult {
  id: string
  title: string
  subtitle?: string
  type: 'account' | 'repo' | 'task' | 'page'
  href: string
}

interface SearchState {
  query: string
  results: SearchResult[]
  isOpen: boolean
  setQuery: (q: string) => void
  setResults: (r: SearchResult[]) => void
  setOpen: (open: boolean) => void
  toggle: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  results: [],
  isOpen: false,
  setQuery: (q) => set({ query: q }),
  setResults: (r) => set({ results: r }),
  setOpen: (open) => set({ isOpen: open }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}))
