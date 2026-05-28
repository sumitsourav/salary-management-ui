import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InsightsPage from './InsightsPage'
import * as insightsClient from '../api/client'

jest.mock('../api/client')

describe('InsightsPage', () => {
  const mockSalaryByCountryData = [
    {
      country: 'USA',
      min_salary: '50000',
      max_salary: '150000',
      avg_salary: '85000',
      employee_count: 50,
    },
    {
      country: 'UK',
      min_salary: '45000',
      max_salary: '140000',
      avg_salary: '80000',
      employee_count: 30,
    },
  ]

  const mockSalaryByJobTitleData = [
    {
      job_title: 'Software Engineer',
      avg_salary: '90000',
      employee_count: 25,
    },
    {
      job_title: 'Product Manager',
      avg_salary: '95000',
      employee_count: 10,
    },
  ]

  const mockTopEarnersData = [
    {
      id: 1,
      full_name: 'Alice Smith',
      job_title: 'VP Engineering',
      department: 'Engineering',
      salary: '200000',
    },
    {
      id: 2,
      full_name: 'Bob Jones',
      job_title: 'VP Product',
      department: 'Product',
      salary: '190000',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    insightsClient.insightsAPI.salaryByCountry = jest
      .fn()
      .mockResolvedValue({ data: mockSalaryByCountryData })
    insightsClient.insightsAPI.salaryByJobTitle = jest
      .fn()
      .mockResolvedValue({ data: mockSalaryByJobTitleData })
    insightsClient.insightsAPI.topEarners = jest
      .fn()
      .mockResolvedValue({ data: mockTopEarnersData })
  })

  describe('Initial Rendering', () => {
    it('renders page title', async () => {
      render(<InsightsPage />)
      expect(screen.getByText('Salary Insights')).toBeInTheDocument()
    })

    it('calls salaryByCountry API on mount', async () => {
      render(<InsightsPage />)
      await waitFor(() => {
        expect(
          insightsClient.insightsAPI.salaryByCountry
        ).toHaveBeenCalled()
      })
    })

    it('displays loading state initially', () => {
      insightsClient.insightsAPI.salaryByCountry = jest
        .fn()
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              setTimeout(
                () => resolve({ data: mockSalaryByCountryData }),
                100
              )
            )
        )
      render(<InsightsPage />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders country filter select', async () => {
      render(<InsightsPage />)
      await waitFor(() => {
        expect(
          screen.getByDisplayValue('Select a country...')
        ).toBeInTheDocument()
      })
    })
  })

  describe('SalaryByCountry Component', () => {
    it('renders SalaryByCountry component after loading', async () => {
      render(<InsightsPage />)
      await waitFor(() => {
        expect(
          screen.getByText('Salary Statistics by Country')
        ).toBeInTheDocument()
      })
    })

  })

  describe('Country Selection', () => {
    it('renders all available countries in select dropdown', async () => {
      render(<InsightsPage />)
      const countrySelect = await screen.findByDisplayValue(
        'Select a country...'
      )
      const options = countrySelect.querySelectorAll('option')
      expect(options.length).toBeGreaterThan(1) // includes "Select a country..." option
    })

    it('shows message when no country is selected', async () => {
      render(<InsightsPage />)
      await waitFor(() => {
        expect(
          screen.getByText(/Select a country above to view/)
        ).toBeInTheDocument()
      })
    })

    it('hides detailed insights when no country is selected', async () => {
      render(<InsightsPage />)
      await waitFor(() => {
        expect(
          screen.queryByText('Average Salary by Job Title in')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('Country Filter Interaction', () => {
    it('calls salaryByJobTitle API when country is selected', async () => {
      render(<InsightsPage />)
      const countrySelect = await screen.findByDisplayValue(
        'Select a country...'
      )
      fireEvent.change(countrySelect, { target: { value: 'USA' } })

      await waitFor(() => {
        expect(
          insightsClient.insightsAPI.salaryByJobTitle
        ).toHaveBeenCalledWith('USA')
      })
    })

    it('calls topEarners API when country is selected', async () => {
      render(<InsightsPage />)
      const countrySelect = await screen.findByDisplayValue(
        'Select a country...'
      )
      fireEvent.change(countrySelect, { target: { value: 'USA' } })

      await waitFor(() => {
        expect(insightsClient.insightsAPI.topEarners).toHaveBeenCalledWith(
          'USA',
          10
        )
      })
    })
  })

  describe('Detailed Insights Display', () => {
    it('displays job title salaries when country is selected', async () => {
      render(<InsightsPage />)
      const countrySelect = await screen.findByDisplayValue(
        'Select a country...'
      )
      fireEvent.change(countrySelect, { target: { value: 'USA' } })

      await waitFor(() => {
        expect(
          screen.getByText('Average Salary by Job Title in USA')
        ).toBeInTheDocument()
      })
    })

    it('displays top earners when country is selected', async () => {
      render(<InsightsPage />)
      const countrySelect = await screen.findByDisplayValue(
        'Select a country...'
      )
      fireEvent.change(countrySelect, { target: { value: 'USA' } })

      await waitFor(() => {
        expect(screen.getByText('Top 10 Earners in USA')).toBeInTheDocument()
      })
    })

    it('displays job titles for selected country', async () => {
      render(<InsightsPage />)
      const countrySelect = await screen.findByDisplayValue(
        'Select a country...'
      )
      fireEvent.change(countrySelect, { target: { value: 'USA' } })

      await waitFor(() => {
        expect(screen.getByText('Software Engineer')).toBeInTheDocument()
        expect(screen.getByText('Product Manager')).toBeInTheDocument()
      })
    })

    it('displays top earners for selected country', async () => {
      render(<InsightsPage />)
      const countrySelect = await screen.findByDisplayValue(
        'Select a country...'
      )
      fireEvent.change(countrySelect, { target: { value: 'USA' } })

      await waitFor(() => {
        expect(screen.getByText('Alice Smith')).toBeInTheDocument()
        expect(screen.getByText('Bob Jones')).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('handles API errors gracefully when loading country salaries', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation()
      insightsClient.insightsAPI.salaryByCountry = jest
        .fn()
        .mockRejectedValue(new Error('API Error'))

      render(<InsightsPage />)
      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled()
      })

      consoleError.mockRestore()
    })

    it('handles API errors when loading job title data', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation()
      insightsClient.insightsAPI.salaryByJobTitle = jest
        .fn()
        .mockRejectedValue(new Error('API Error'))

      render(<InsightsPage />)
      const countrySelect = await screen.findByDisplayValue(
        'Select a country...'
      )
      fireEvent.change(countrySelect, { target: { value: 'USA' } })

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled()
      })

      consoleError.mockRestore()
    })

    it('handles API errors when loading top earners data', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation()
      insightsClient.insightsAPI.topEarners = jest
        .fn()
        .mockRejectedValue(new Error('API Error'))

      render(<InsightsPage />)
      const countrySelect = await screen.findByDisplayValue(
        'Select a country...'
      )
      fireEvent.change(countrySelect, { target: { value: 'USA' } })

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled()
      })

      consoleError.mockRestore()
    })
  })

  describe('Country Switch', () => {
    it('updates insights when switching between countries', async () => {
      render(<InsightsPage />)
      const countrySelect = await screen.findByDisplayValue(
        'Select a country...'
      )

      fireEvent.change(countrySelect, { target: { value: 'USA' } })
      await waitFor(() => {
        expect(screen.getByText('Top 10 Earners in USA')).toBeInTheDocument()
      })

      jest.clearAllMocks()
      insightsClient.insightsAPI.salaryByJobTitle = jest
        .fn()
        .mockResolvedValue({ data: mockSalaryByJobTitleData })
      insightsClient.insightsAPI.topEarners = jest
        .fn()
        .mockResolvedValue({ data: mockTopEarnersData })

      fireEvent.change(countrySelect, { target: { value: 'UK' } })
      await waitFor(() => {
        expect(screen.getByText('Top 10 Earners in UK')).toBeInTheDocument()
      })
    })
  })

  describe('Component Integration', () => {
    it('renders all main sections together', async () => {
      render(<InsightsPage />)
      await waitFor(() => {
        expect(screen.getByText('Salary Insights')).toBeInTheDocument()
        expect(
          screen.getByText('Salary Statistics by Country')
        ).toBeInTheDocument()
        expect(
          screen.getByDisplayValue('Select a country...')
        ).toBeInTheDocument()
      })
    })
  })
})
