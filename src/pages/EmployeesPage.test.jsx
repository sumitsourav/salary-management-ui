import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmployeesPage from './EmployeesPage'
import * as employeeClient from '../api/client'

jest.mock('../api/client')

describe('EmployeesPage Filtering', () => {
  const mockEmployees = [
    { id: 1, full_name: 'Alice Smith', job_title: 'Engineer', country: 'USA', salary: 80000, department: 'Engineering' },
    { id: 2, full_name: 'Bob Jones', job_title: 'Designer', country: 'India', salary: 70000, department: 'Product' },
  ]

  const mockResponse = {
    data: {
      data: mockEmployees,
      pagination: { current_page: 1, per_page: 50, total_count: 2, total_pages: 1 },
    },
  }

  beforeEach(() => {
    employeeClient.employeeAPI.list = jest.fn().mockResolvedValue(mockResponse)
  })

  it('renders search input', () => {
    render(<EmployeesPage />)
    expect(screen.getByPlaceholderText(/search name, job title/i)).toBeInTheDocument()
  })

  it('renders country filter dropdown', () => {
    render(<EmployeesPage />)
    expect(screen.getByDisplayValue(/all countries/i)).toBeInTheDocument()
  })

  it('renders department filter dropdown', () => {
    render(<EmployeesPage />)
    expect(screen.getByDisplayValue(/all departments/i)).toBeInTheDocument()
  })

  it('updates search input when user types', async () => {
    render(<EmployeesPage />)
    const searchInput = screen.getByPlaceholderText(/search name, job title/i)

    await userEvent.type(searchInput, 'Alice')
    expect(searchInput.value).toBe('Alice')
  })

  it('calls API with search filter when searching', async () => {
    render(<EmployeesPage />)
    const searchInput = screen.getByPlaceholderText(/search name, job title/i)

    await userEvent.type(searchInput, 'Alice')
    fireEvent.change(searchInput, { target: { value: 'Alice' } })

    await waitFor(() => {
      expect(employeeClient.employeeAPI.list).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ search: 'Alice' })
      )
    })
  })

  it('calls API with combined filters', async () => {
    render(<EmployeesPage />)
    const searchInput = screen.getByPlaceholderText(/search name, job title/i)
    const countrySelect = screen.getByDisplayValue(/all countries/i)

    await userEvent.type(searchInput, 'Alice')
    fireEvent.change(countrySelect, { target: { value: 'USA' } })

    await waitFor(() => {
      expect(employeeClient.employeeAPI.list).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ search: 'Alice', country: 'USA' })
      )
    })
  })

  it('resets filters when reset button clicked', async () => {
    render(<EmployeesPage />)
    const resetButton = screen.getByText(/reset/i)
    const searchInput = screen.getByPlaceholderText(/search name, job title/i)

    await userEvent.type(searchInput, 'Alice')
    await userEvent.click(resetButton)

    expect(searchInput.value).toBe('')
    expect(employeeClient.employeeAPI.list).toHaveBeenCalled()
  })
})
