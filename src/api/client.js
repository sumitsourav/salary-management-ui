import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api/v1'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const employeeAPI = {
  list: (page = 1, perPage = 50, filters = {}) =>
    client.get('/employees', { params: { page, per_page: perPage, ...filters } }),
  get: (id) => client.get(`/employees/${id}`),
  create: (data) => client.post('/employees', { employee: data }),
  update: (id, data) => client.put(`/employees/${id}`, { employee: data }),
  delete: (id) => client.delete(`/employees/${id}`),
}

export const insightsAPI = {
  salaryByCountry: () => client.get('/insights/salary_by_country'),
  salaryByJobTitle: (country) =>
    client.get('/insights/salary_by_job_title', { params: { country } }),
  topEarners: (country, limit = 10) =>
    client.get('/insights/top_earners', { params: { country, limit } }),
}

export default client
