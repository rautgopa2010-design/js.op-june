import { useState } from 'react'

const initialEmployees = [
  { name: 'Amelia Hart', department: 'Human Resources', role: 'HR Lead', status: 'Active', attendance: '98%' },
  { name: 'Nikhil Shah', department: 'Engineering', role: 'Senior Engineer', status: 'Present', attendance: '96%' },
  { name: 'Priya Nair', department: 'Finance', role: 'Payroll Manager', status: 'Leave', attendance: '85%' },
  { name: 'Aarav Patel', department: 'Sales', role: 'Account Executive', status: 'Active', attendance: '92%' },
  { name: 'Mia Roy', department: 'Customer Success', role: 'Success Manager', status: 'Inactive', attendance: '74%' }
]

const statusStyles = {
  Active: 'bg-emerald-100 text-emerald-700',
  Present: 'bg-sky-100 text-sky-700',
  Leave: 'bg-amber-100 text-amber-700',
  Inactive: 'bg-slate-100 text-slate-600'
}

const departments = ['Human Resources', 'Engineering', 'Finance', 'Sales', 'Customer Success', 'Marketing', 'Operations']
const roles = ['HR Lead', 'Senior Engineer', 'Payroll Manager', 'Account Executive', 'Success Manager', 'Developer', 'Designer', 'Manager']

function AddEmployeeModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    role: '',
    status: 'Active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.department && formData.role) {
      onAdd({
        ...formData,
        attendance: '100%'
      })
      setFormData({ name: '', department: '', role: '', status: 'Active' })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md rounded-[28px] p-6 shadow-floating">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Add New Employee</h3>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/10"
              placeholder="Enter employee name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/10"
              required
            >
              <option value="">Select department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/10"
              required
            >
              <option value="">Select role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/10"
            >
              <option value="Active">Active</option>
              <option value="Present">Present</option>
              <option value="Leave">Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-brand-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary/90"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function EmployeeTable() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddEmployee = (newEmployee) => {
    const employeeWithId = {
      ...newEmployee,
      id: `CR-0${employees.length + 15}`
    }
    setEmployees([...employees, employeeWithId])
  }

  return (
    <>
      <section className="glass-card rounded-[28px] p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Employee roster</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Team performance table</h3>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary/90"
            >
              <span>+</span>
              Add Employee
            </button>
            <button className="inline-flex items-center rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              View all employees
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/75">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr className="sticky top-0">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.name || index} className="border-t border-slate-200/80 transition hover:bg-slate-50">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-secondary/10 text-lg font-semibold text-brand-secondary">
                        {employee.name.split(' ').map((part) => part[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{employee.name}</p>
                        <p className="text-sm text-slate-500">ID: {employee.id || `CR-0${index + 14}`}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-700">{employee.department}</td>
                  <td className="px-6 py-5 text-slate-700">{employee.role}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex rounded-2xl px-3 py-1 text-xs font-semibold ${statusStyles[employee.status]}`}>{employee.status}</span>
                  </td>
                  <td className="px-6 py-5 text-slate-700">{employee.attendance}</td>
                  <td className="px-6 py-5">
                    <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEmployee}
      />
    </>
  )
}
