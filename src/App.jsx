import { useState } from 'react'
import EmployeesPage from './pages/EmployeesPage'
import InsightsPage from './pages/InsightsPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState('employees')

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Salary Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('employees')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'employees'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Employees
              </button>
              <button
                onClick={() => setCurrentPage('insights')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'insights'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Insights
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentPage === 'employees' && <EmployeesPage />}
        {currentPage === 'insights' && <InsightsPage />}
      </main>
    </div>
  )
}
