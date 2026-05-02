import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import KPIGrid from '../components/KPIGrid'
import ChartSection from '../components/ChartSection'
import EmployeeTable from '../components/EmployeeTable'
import RightSidebar from '../components/RightSidebar'

const sectionDescriptions = {
  Dashboard: 'Your central people operations hub for HR, payroll, attendance and performance.',
  Employees: 'Manage employee records, teams, roles, and profiles in one place.',
  Attendance: 'Track daily attendance and monitor employee availability in real-time.',
  'Leave Management': 'Review leave requests, approvals, and team absence history.',
  Payroll: 'Process salaries, allowances, and payroll summaries with confidence.',
  Recruitment: 'Manage open roles, candidates, and hiring workflows.',
  Performance: 'Review performance metrics, goals, and appraisal cycles.',
  Reports: 'Generate high-impact workforce reports and analytics snapshots.',
  Settings: 'Configure your HRMS preferences, teams, and platform settings.'
}

function SectionPlaceholder({ title }) {
  return (
    <div className="glass-card rounded-[28px] p-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-semibold text-slate-900">{title} workspace</h3>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Coming soon</div>
      </div>
      <p className="max-w-2xl text-slate-600">{sectionDescriptions[title]}</p>
      <div className="mt-8 rounded-[28px] bg-slate-50 p-8 text-slate-500 shadow-sm">
        <p className="text-sm">This section is ready to be connected with the next layer of HRMS workflows.</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('Dashboard')

  return (
    <div className="min-h-screen bg-brand-gradient/80">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-5 lg:px-8">
        <Sidebar activeSection={activeSection} onSelect={setActiveSection} />

        <div className="flex min-h-screen flex-1 flex-col gap-6">
          <Topbar />

          <main className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
            <section className="space-y-6">
              <div className="glass-card rounded-[28px] p-5">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">CrescoSoft HRMS</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900">{activeSection === 'Dashboard' ? 'Enterprise people experience for modern teams' : activeSection}</h1>
                    <p className="mt-2 max-w-2xl text-slate-600">{sectionDescriptions[activeSection]}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/5 px-4 py-2 text-sm text-slate-700">
                    Live prototype · Tailwind UI · SaaS-grade experience
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-[24px] bg-slate-950/5 p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Brand pulse</p>
                        <h2 className="mt-3 text-2xl font-semibold text-slate-900">+28%</h2>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-primary/10 text-brand-primary">
                        📈
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">Employee engagement and people operations are running smoothly.</p>
                  </div>
                  <div className="rounded-[24px] bg-brand-primary/10 p-4 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-600">Revenue care</p>
                        <h2 className="mt-3 text-2xl font-semibold text-slate-900">+133</h2>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/80 text-brand-primary shadow-sm">
                        💼
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">A modern SAAS dashboard built for workforce management.</p>
                  </div>
                  <div className="rounded-[24px] bg-gradient-to-br from-brand-secondary/15 via-brand-accent/10 to-brand-primary/10 p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-600">Team experience</p>
                        <h2 className="mt-3 text-2xl font-semibold text-slate-900">12.4k</h2>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/90 text-brand-secondary shadow-sm">
                        ⭐
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">Advanced employee metrics and people insights at a glance.</p>
                  </div>
                </div>
              </div>

              {activeSection === 'Dashboard' && (
                <>
                  <KPIGrid />
                  <ChartSection />
                  <EmployeeTable />
                </>
              )}

              {activeSection === 'Employees' && <EmployeeTable />}
              {activeSection !== 'Dashboard' && activeSection !== 'Employees' && <SectionPlaceholder title={activeSection} />}
            </section>

            <aside className="space-y-6">
              <RightSidebar />
            </aside>
          </main>
        </div>
      </div>
    </div>
  )
}
