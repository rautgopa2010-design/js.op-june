const stats = [
  { label: 'Total Employees', value: '1,248', trend: '+6.4%', icon: '👥', color: 'from-brand-primary to-brand-secondary' },
  { label: 'Present Today', value: '893', trend: '+1.8%', icon: '✅', color: 'from-brand-secondary to-brand-primary' },
  { label: 'On Leave', value: '74', trend: '-2.1%', icon: '🛌', color: 'from-brand-accent to-brand-primary' },
  { label: 'New Joinees', value: '24', trend: '+12%', icon: '✨', color: 'from-brand-secondary to-brand-accent' },
  { label: 'Payroll Processed', value: '$420K', trend: '+3.2%', icon: '💼', color: 'from-brand-primary to-brand-accent' },
  { label: 'Open Positions', value: '18', trend: '+4.7%', icon: '🎯', color: 'from-brand-accent to-brand-secondary' }
]

export default function KPIGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => (
        <article
          key={item.label}
          className={`group rounded-[24px] bg-gradient-to-br ${item.color} p-4 text-white shadow-floating transition duration-300 hover:-translate-y-0.5 hover:shadow-soft`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/70">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold">{item.value}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/15 text-xl shadow-sm">{item.icon}</div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-white/80">
            <span className="rounded-full bg-white/15 px-2 py-1">Trend</span>
            <span className="font-semibold">{item.trend}</span>
          </div>
        </article>
      ))}
    </section>
  )
}
