import { useState, useEffect } from 'react'
import { employeeAPI } from '../api/client'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeForm from '../components/EmployeeForm'
import EmployeeFilters from '../components/EmployeeFilters'

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [perPage] = useState(50)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [totalCount, setTotalCount] = useState(0)

  const [filters, setFilters] = useState({
    search: '',
    country: '',
    department: '',
  })

  const [formData, setFormData] = useState({
    full_name: '',
    job_title: '',
    country: '',
    salary: '',
    department: '',
  })

  const [countries, setCountries] = useState([])
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    loadEmployees()
  }, [page, filters])

  useEffect(() => {
    loadCountriesAndDepartments()
  }, [])

  const loadCountriesAndDepartments = async () => {
    try {
      const res = await employeeAPI.list(1, 10000)
      const uniqueCountries = [...new Set(res.data.data.map(e => e.country))].sort()
      const uniqueDepartments = [...new Set(res.data.data.map(e => e.department))].sort()
      setCountries(uniqueCountries)
      setDepartments(uniqueDepartments)
    } catch (error) {
      console.error('Failed to load filter options:', error)
    }
  }

  const loadEmployees = async () => {
    setLoading(true)
    try {
      const res = await employeeAPI.list(page, perPage, filters)
      setEmployees(res.data.data)
      setTotalPages(res.data.pagination.total_pages)
      setTotalCount(res.data.pagination.total_count)
    } catch (error) {
      console.error('Failed to load employees:', error)
    }
    setLoading(false)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleResetFilters = () => {
    setFilters({ search: '', country: '', department: '' })
    setPage(1)
  }

  const handleAddClick = () => {
    setEditingId(null)
    setFormData({ full_name: '', job_title: '', country: '', salary: '', department: '' })
    setShowForm(true)
  }

  const handleEditClick = (employee) => {
    setEditingId(employee.id)
    setFormData({
      full_name: employee.full_name,
      job_title: employee.job_title,
      country: employee.country,
      salary: employee.salary,
      department: employee.department,
    })
    setShowForm(true)
  }

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await employeeAPI.delete(id)
        loadEmployees()
      } catch (error) {
        console.error('Failed to delete:', error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await employeeAPI.update(editingId, formData)
      } else {
        await employeeAPI.create(formData)
      }
      setShowForm(false)
      loadEmployees()
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Employees</h2>
          <p className="text-gray-600 mt-1">{totalCount} total employees</p>
        </div>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          + Add Employee
        </button>
      </div>

      {showForm && (
        <EmployeeForm
          data={formData}
          onChange={(field, value) => setFormData({ ...formData, [field]: value })}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <EmployeeFilters
        filters={filters}
        countries={countries}
        departments={departments}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <EmployeeTable
            employees={employees}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />

          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
