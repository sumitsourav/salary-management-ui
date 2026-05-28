export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salary</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{emp.full_name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{emp.job_title}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{emp.country}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{emp.department}</td>
              <td className="px-6 py-4 text-sm text-gray-600">${parseFloat(emp.salary).toLocaleString()}</td>
              <td className="px-6 py-4 text-sm space-x-2">
                <button
                  onClick={() => onEdit(emp)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(emp.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
