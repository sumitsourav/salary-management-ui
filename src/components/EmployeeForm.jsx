export default function EmployeeForm({ data, onChange, onSubmit, onCancel }) {
  const countries = ['USA', 'UK', 'India', 'Canada', 'Germany', 'France', 'Japan', 'Australia']
  const departments = ['Engineering', 'Product', 'HR', 'Sales', 'Operations', 'Finance', 'Marketing']
  const jobTitles = ['Software Engineer', 'Product Manager', 'Designer', 'Data Analyst', 'HR Manager', 'Sales Executive', 'DevOps Engineer', 'QA Engineer']

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{data.id ? 'Edit' : 'Add'} Employee</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="full_name"
              type="text"
              value={data.full_name}
              onChange={(e) => onChange('full_name', e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">Job Title</label>
            <select
              id="job_title"
              value={data.job_title}
              onChange={(e) => onChange('job_title', e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Job Title</option>
              {jobTitles.map((jt) => (
                <option key={jt} value={jt}>{jt}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <select
              id="country"
              value={data.country}
              onChange={(e) => onChange('country', e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <select
              id="department"
              value={data.department}
              onChange={(e) => onChange('department', e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              id="salary"
              type="number"
              step="0.01"
              value={data.salary}
              onChange={(e) => onChange('salary', e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
