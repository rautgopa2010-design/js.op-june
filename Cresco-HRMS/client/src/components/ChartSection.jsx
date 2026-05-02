const attendanceData = [72, 80, 78, 88, 92, 90, 95, 94, 96, 91, 93, 98]
const departments = [
  { name: 'Engineering', value: 38 },
  { name: 'HR', value: 16 },
  { name: 'Sales', value: 24 },
  { name: 'Customer Success', value: 12 },
  { name: 'Finance', value: 10 }
]
const leaveTypes = [
  { name: 'Sick Leave', value: 34, color: '#0F4C81' },
  { name: 'Casual Leave', value: 28, color: '#2ECC71' },
  { name: 'Maternity', value: 18, color: '#F39C12' },
  { name: 'Other', value: 20, color: '#94A3B8' }
]

const attendancePath = () => {
  return attendanceData
    .map((value, index) => `${index === 0 ? 'M' : 'L'}${(index * 100) / 11},${60 - value * 0.5}`)
    .join(' ')
}

const getLeaveSegments = () => {
  const circumference = 2 * Math.PI * 40
  let offset = 0
  return leaveTypes.map((item) => {
    const length = (item.value / 100) * circumference
    const segment = {
      ...item,
      strokeDasharray: `${length} ${circumference}`,
      strokeDashoffset: circumference - offset
    }
    offset += length
    return segment
  })
}

export default function ChartSection() {
  const leaveSegments = getLeaveSegments()

  return (
    <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="glass-card rounded-[28px] p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Attendance trend</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Monthly engagement</h3>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">This month</div>
        </div>
        <div className="h-[280px] overflow-hidden rounded-[28px] bg-slate-950/5 p-6">
          <svg viewBox="0 0 100 60" className="h-full w-full">
            <defs>
              <linearGradient id="attendanceGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#0f4c81" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#2ecc71" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path d={attendancePath()} fill="none" stroke="url(#attendanceGradient)" strokeWidth="3" strokeLinecap="round" />
            <path
              d={`${attendancePath()} L100,60 L0,60 Z`}
              fill="url(#attendanceGradient)"
              opacity="0.35"
            />
          </svg>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="glass-card rounded-[28px] p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Department distribution</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">Headcount by team</h3>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Top overview</div>
          </div>
          <div className="space-y-4">
            {departments.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-700">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[28px] p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Leave breakdown</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">Time-off mix</h3>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">2026</div>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative h-44 w-44 flex-shrink-0">
              <svg viewBox="0 0 160 160" className="h-full w-full rotate-[-90deg]">
                <circle cx="80" cy="80" r="40" fill="none" stroke="#e2e8f0" strokeWidth="24" />
                {leaveSegments.map((segment) => (
                  <circle
                    key={segment.name}
                    cx="80"
                    cy="80"
                    r="40"
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="24"
                    strokeDasharray={segment.strokeDasharray}
                    strokeDashoffset={segment.strokeDashoffset}
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </div>
            <div className="space-y-3">
              {leaveTypes.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3 rounded-3xl bg-slate-100/80 p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
