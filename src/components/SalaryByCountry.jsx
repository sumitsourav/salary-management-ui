export default function SalaryByCountry({ data }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Salary Statistics by Country</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Max Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employees</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.country} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.country}</td>
                <td className="px-6 py-4 text-sm text-gray-600">${parseFloat(row.min_salary).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                <td className="px-6 py-4 text-sm text-gray-600">${parseFloat(row.max_salary).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                <td className="px-6 py-4 text-sm text-gray-600">${parseFloat(row.avg_salary).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{row.employee_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
