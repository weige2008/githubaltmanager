import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLayoutStore } from '@/store/layout'

export function useSidebarView() {
  const location = useLocation()
  const { setActiveRoute, toggleCollapsed } = useLayoutStore()

  useEffect(() => {
    setActiveRoute(location.pathname)
  }, [location.pathname, setActiveRoute])

  return { toggleCollapsed }
}
