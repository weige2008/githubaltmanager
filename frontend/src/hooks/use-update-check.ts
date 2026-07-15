import { useQuery } from '@tanstack/react-query'
import { systemApi } from '@/api'

export function useUpdateCheck() {
  return useQuery({
    queryKey: ['system-update'],
    queryFn: () => systemApi.checkUpdate(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 30 * 60 * 1000, // check every 30 min
    retry: false,
  })
}
