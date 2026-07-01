import { useMediaQuery } from './use-media-query'

export function useMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

export function useTablet(): boolean {
  return useMediaQuery('(max-width: 1024px)')
}

export function useDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}
