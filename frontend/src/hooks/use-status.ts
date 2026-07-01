import { useQuery } from '@tanstack/react-query'
import { authApi } from '@/api'

export function useStatus() {
  return useQuery({
    queryKey: ['status'],
    queryFn: () => authApi.status(),
    staleTime: 60000,
    refetchOnMount: true,
  })
}
