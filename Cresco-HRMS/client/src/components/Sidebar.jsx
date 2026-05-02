const navItems = [
  { label: 'Dashboard', icon: '📊', active: true },
  { label: 'Employees', icon: '👥' },
  { label: 'Attendance', icon: '🗓️' },
  { label: 'Leave Management', icon: '🛌' },
  { label: 'Payroll', icon: '💰' },
  { label: 'Recruitment', icon: '🧲' },
  { label: 'Performance', icon: '🚀' },
  { label: 'Reports', icon: '📈' },
  { label: 'Settings', icon: '⚙️' }
]

export default function Sidebar({ activeSection, onSelect }) {
  return (
    <aside className="sticky top-5 hidden min-h-[calc(100vh-40px)] w-full max-w-[320px] shrink-0 rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-floating backdrop-blur-xl lg:block">
      <div className="mb-10 flex items-center gap-3">
        <div className="grid h-14 w-14 place-items-center rounded-3xl bg-brand-primary text-white shadow-soft">
          CS
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">CrescoSoft</p>
          <h2 className="text-xl font-semibold text-slate-900">HRMS Suite</h2>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.label
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelect(item.label)}
              className={`group flex w-full items-center gap-4 rounded-3xl px-4 py-3 text-left transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-soft'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`grid h-11 w-11 place-items-center rounded-3xl bg-white/80 text-lg shadow-sm transition duration-300 ${isActive ? 'group-hover:bg-white/90' : 'group-hover:bg-brand-primary/10'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-10 rounded-[28px] bg-brand-secondary/5 p-5 text-sm text-slate-700 shadow-sm">
        <p className="font-semibold text-slate-900">Workforce health</p>
        <p className="mt-3 text-slate-500">Enable people teams with a premium SAP-inspired HRMS experience.</p>
      </div>
    </aside>
  )
}
