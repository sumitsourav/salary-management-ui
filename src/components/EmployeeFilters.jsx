import { useState, useEffect } from 'react'

export default function EmployeeFilters({ filters, countries, departments, onFilterChange, onReset }) {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')
  const [department, setDepartment] = useState('')

  useEffect(() => {
    setSearch(filters.search)
    setCountry(filters.country)
    setDepartment(filters.department)
  }, [filters])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)
    onFilterChange({ search: value, country, department })
  }

  const handleCountryChange = (e) => {
    const value = e.target.value
    setCountry(value)
    onFilterChange({ search, country: value, department })
  }

  const handleDepartmentChange = (e) => {
    const value = e.target.value
    setDepartment(value)
    onFilterChange({ search, country, department: value })
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search name, job title..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={country}
          onChange={handleCountryChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Countries</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={department}
          onChange={handleDepartmentChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          {departments.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
