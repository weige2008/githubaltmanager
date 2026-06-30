import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store/app'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AccountsPage from './pages/AccountsPage'
import AccountDetailPage from './pages/AccountDetailPage'
import ReposPage from './pages/ReposPage'
import TasksPage from './pages/TasksPage'
import BatchPage from './pages/BatchPage'
import AutomationPage from './pages/AutomationPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

function Protected({ children }: { children: React.ReactNode }) {
  const token = useAppStore((s) => s.token)
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      {/* 公开页面 */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 受保护的控制台 */}
      <Route path="/" element={<Protected><MainLayout /></Protected>}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="accounts" element={<AccountsPage />} />
        <Route path="accounts/:id" element={<AccountDetailPage />} />
        <Route path="repos" element={<ReposPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="batch" element={<BatchPage />} />
        <Route path="automation" element={<AutomationPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
