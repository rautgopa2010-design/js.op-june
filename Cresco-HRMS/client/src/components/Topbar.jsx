import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Topbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="glass-card flex flex-col gap-4 rounded-[28px] border border-white/70 p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Welcome back, {user?.name || 'There'}</p>
        <h2 className="text-2xl font-semibold text-slate-900">Your HR operations dashboard</h2>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[320px]">
          <input
            type="search"
            placeholder="Search employees, reports, salary..."
            className="w-full rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="relative inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/90 text-slate-700 shadow-sm transition hover:bg-brand-primary/10">
            <span className="text-xl">🔔</span>
            <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[10px] font-semibold text-white">3</span>
          </button>
          <button className="inline-flex items-center gap-3 rounded-3xl bg-slate-900 px-4 py-3 text-white shadow-soft transition hover:bg-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-secondary text-sm font-semibold uppercase text-white">
              {user?.name ? user.name.split(' ').map((part) => part[0]).join('') : 'CS'}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">{user?.name ?? 'Cresco User'}</p>
              <p className="text-xs text-slate-400">{user?.title ?? 'HR Lead'}</p>
            </div>
          </button>
          <button
            onClick={handleLogout}
            className="rounded-3xl bg-brand-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
