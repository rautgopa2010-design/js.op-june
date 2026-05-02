import { useAuth } from '../context/AuthContext'

export default function EmployeePortal() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="min-h-screen bg-brand-gradient/80 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="glass-card rounded-[28px] p-6 shadow-soft">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Employee portal</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Welcome back, {user.name}</h1>
              <p className="mt-2 max-w-2xl text-slate-600">Your personal HR workspace for profile, attendance, and payroll summary.</p>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Role: {user.role}</div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass-card rounded-[28px] p-5 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Profile</p>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{user.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{user.title} · {user.department}</p>
            <div className="mt-5 space-y-2 text-sm text-slate-700">
              <p>Email: {user.email}</p>
              <p>Status: Active</p>
              <p>Employee ID: {user.id ? `CR-0${user.id + 10}` : 'N/A'}</p>
            </div>
          </div>
          <div className="glass-card rounded-[28px] p-5 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Attendance</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-brand-primary/10 p-4 text-center">
                <p className="text-3xl font-semibold text-brand-primary">98%</p>
                <p className="mt-2 text-sm text-slate-600">Present</p>
              </div>
              <div className="rounded-3xl bg-slate-100 p-4 text-center">
                <p className="text-3xl font-semibold text-slate-900">2</p>
                <p className="mt-2 text-sm text-slate-600">Leave days</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-[28px] p-5 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Payroll</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Last payment</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">$4,500</p>
              </div>
              <div className="rounded-3xl bg-brand-secondary/10 p-4">
                <p className="text-sm text-slate-600">Next payout</p>
                <p className="mt-2 text-2xl font-semibold text-brand-secondary">5 Jun</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card rounded-[28px] p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Your calendar</p>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">2 events</span>
            </div>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-semibold text-slate-900">Team meeting</p>
                <p className="mt-1">Mon, 5th May · 10:00 AM</p>
              </div>
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-semibold text-slate-900">Performance review</p>
                <p className="mt-1">Thu, 15th May · 3:00 PM</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[28px] p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Recent activity</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              <li className="rounded-3xl bg-slate-100 p-4">Leave request approved for May 16.</li>
              <li className="rounded-3xl bg-slate-100 p-4">Payroll statement generated for April.</li>
              <li className="rounded-3xl bg-slate-100 p-4">Profile updated successfully.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
