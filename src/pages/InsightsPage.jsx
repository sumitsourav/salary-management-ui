import { useState, useEffect } from 'react'
import { insightsAPI } from '../api/client'
import SalaryByCountry from '../components/SalaryByCountry'
import SalaryByJobTitle from '../components/SalaryByJobTitle'
import TopEarners from '../components/TopEarners'

export default function InsightsPage() {
  const [salaryByCountry, setSalaryByCountry] = useState([])
  const [salaryByJobTitle, setSalaryByJobTitle] = useState([])
  const [topEarners, setTopEarners] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('')

  const countries = ['USA', 'UK', 'India', 'Canada', 'Germany', 'France', 'Japan', 'Australia']

  useEffect(() => {
    loadInsights()
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      loadJobTitleData()
      loadTopEarnersData()
    }
  }, [selectedCountry])

  const loadInsights = async () => {
    setLoading(true)
    try {
      const res = await insightsAPI.salaryByCountry()
      setSalaryByCountry(res.data)
    } catch (error) {
      console.error('Failed to load insights:', error)
    }
    setLoading(false)
  }

  const loadJobTitleData = async () => {
    try {
      const res = await insightsAPI.salaryByJobTitle(selectedCountry)
      setSalaryByJobTitle(res.data)
    } catch (error) {
      console.error('Failed to load job title data:', error)
    }
  }

  const loadTopEarnersData = async () => {
    try {
      const res = await insightsAPI.topEarners(selectedCountry, 10)
      setTopEarners(res.data)
    } catch (error) {
      console.error('Failed to load top earners:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Salary Insights</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <SalaryByCountry data={salaryByCountry} />

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Country:</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a country...</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {selectedCountry && (
            <>
              <SalaryByJobTitle data={salaryByJobTitle} country={selectedCountry} />
              <TopEarners data={topEarners} country={selectedCountry} />
            </>
          )}

          {!selectedCountry && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-blue-800">Select a country above to view job title salaries and top earners</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
