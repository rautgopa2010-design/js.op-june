const quickActions = [
  { label: 'Add Employee', icon: '➕' },
  { label: 'Mark Attendance', icon: '🕒' },
  { label: 'Apply Leave', icon: '📝' }
]

const holidays = [
  { day: 'Mon, May 5', title: 'Labor Day' },
  { day: 'Fri, May 16', title: 'Team Offsite' }
]

const birthdays = [
  'AR',
  'PN',
  'MK',
  'SG'
]

export default function RightSidebar() {
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-[28px] p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Upcoming holidays</p>
        <div className="mt-5 space-y-4">
          {holidays.map((holiday) => (
            <div key={holiday.title} className="rounded-3xl bg-slate-100/80 p-4">
              <p className="text-sm font-semibold text-slate-900">{holiday.title}</p>
              <p className="mt-1 text-sm text-slate-500">{holiday.day}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-[28px] p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Birthdays today</p>
          <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">4</span>
        </div>
        <div className="mt-5 flex -space-x-3 items-center">
          {birthdays.map((person) => (
            <div key={person} className="flex h-12 w-12 items-center justify-center rounded-3xl border border-white/80 bg-brand-primary text-sm font-semibold text-white shadow-sm">
              {person}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-[28px] p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick actions</p>
        <div className="mt-5 space-y-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="flex w-full items-center justify-between rounded-3xl bg-slate-100 px-4 py-4 text-left text-sm font-semibold text-slate-800 transition hover:bg-brand-primary/10"
            >
              <span>{action.label}</span>
              <span>{action.icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
