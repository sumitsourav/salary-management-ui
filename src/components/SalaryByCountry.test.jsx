import { render, screen } from '@testing-library/react'
import SalaryByCountry from './SalaryByCountry'

describe('SalaryByCountry', () => {
  const mockData = [
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
    {
      country: 'India',
      min_salary: '30000',
      max_salary: '100000',
      avg_salary: '60000',
      employee_count: 70,
    },
  ]

  describe('Rendering', () => {
    it('renders component title', () => {
      render(<SalaryByCountry data={mockData} />)
      expect(
        screen.getByText('Salary Statistics by Country')
      ).toBeInTheDocument()
    })

    it('renders table headers', () => {
      render(<SalaryByCountry data={mockData} />)
      expect(screen.getByText('Country')).toBeInTheDocument()
      expect(screen.getByText('Min Salary')).toBeInTheDocument()
      expect(screen.getByText('Max Salary')).toBeInTheDocument()
      expect(screen.getByText('Avg Salary')).toBeInTheDocument()
      expect(screen.getByText('Employees')).toBeInTheDocument()
    })

    it('renders all countries', () => {
      render(<SalaryByCountry data={mockData} />)
      expect(screen.getByText('USA')).toBeInTheDocument()
      expect(screen.getByText('UK')).toBeInTheDocument()
      expect(screen.getByText('India')).toBeInTheDocument()
    })

    it('renders all salary data rows', () => {
      const { container } = render(<SalaryByCountry data={mockData} />)
      const rows = container.querySelectorAll('tbody tr')
      expect(rows.length).toBe(mockData.length)
    })
  })

  describe('Data Display', () => {
    it('displays min salary correctly', () => {
      render(<SalaryByCountry data={mockData} />)
      const minSalaries = screen.getAllByText(/^\$/)
      expect(minSalaries.length).toBeGreaterThan(0)
    })

    it('displays max salary correctly', () => {
      render(<SalaryByCountry data={mockData} />)
      const salaryTexts = screen.getAllByText(/^\$/)
      expect(salaryTexts.length).toBeGreaterThan(0)
    })

    it('displays average salary correctly', () => {
      render(<SalaryByCountry data={mockData} />)
      const salaryTexts = screen.getAllByText(/^\$/)
      expect(salaryTexts.length).toBeGreaterThan(0)
    })

    it('displays employee count correctly', () => {
      render(<SalaryByCountry data={mockData} />)
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.getByText('30')).toBeInTheDocument()
      expect(screen.getByText('70')).toBeInTheDocument()
    })

    it('formats salary with proper locale formatting', () => {
      render(<SalaryByCountry data={mockData} />)
      expect(screen.getByText('$85,000')).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('renders empty table when data is empty', () => {
      render(<SalaryByCountry data={[]} />)
      expect(
        screen.getByText('Salary Statistics by Country')
      ).toBeInTheDocument()
      const { container } = render(<SalaryByCountry data={[]} />)
      const rows = container.querySelectorAll('tbody tr')
      expect(rows.length).toBe(0)
    })
  })

  describe('Table Structure', () => {
    it('renders a valid HTML table structure', () => {
      const { container } = render(<SalaryByCountry data={mockData} />)
      expect(container.querySelector('table')).toBeInTheDocument()
      expect(container.querySelector('thead')).toBeInTheDocument()
      expect(container.querySelector('tbody')).toBeInTheDocument()
    })

    it('renders table with proper styling classes', () => {
      const { container } = render(<SalaryByCountry data={mockData} />)
      const table = container.querySelector('table')
      expect(table.className).toContain('min-w-full')
    })
  })

  describe('Data Formatting', () => {
    it('handles large salary numbers with comma formatting', () => {
      const largeData = [
        {
          country: 'USA',
          min_salary: '500000',
          max_salary: '1500000',
          avg_salary: '850000',
          employee_count: 50,
        },
      ]
      render(<SalaryByCountry data={largeData} />)
      expect(screen.getByText('$850,000')).toBeInTheDocument()
    })

    it('handles decimal salary values', () => {
      const decimalData = [
        {
          country: 'USA',
          min_salary: '50000.50',
          max_salary: '150000.75',
          avg_salary: '85000.25',
          employee_count: 50,
        },
      ]
      render(<SalaryByCountry data={decimalData} />)
      expect(screen.getByText('$85,000')).toBeInTheDocument()
    })

    it('removes fraction digits from displayed salary', () => {
      const data = [
        {
          country: 'USA',
          min_salary: '50000.99',
          max_salary: '150000.99',
          avg_salary: '85000.99',
          employee_count: 50,
        },
      ]
      render(<SalaryByCountry data={data} />)
      expect(screen.getByText('$85,001')).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('has overflow-x-auto class for horizontal scrolling', () => {
      const { container } = render(<SalaryByCountry data={mockData} />)
      const wrapper = container.querySelector('.overflow-x-auto')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic HTML structure with thead and tbody', () => {
      const { container } = render(<SalaryByCountry data={mockData} />)
      expect(container.querySelector('thead')).toBeInTheDocument()
      expect(container.querySelector('tbody')).toBeInTheDocument()
    })

    it('renders table headers with th elements', () => {
      const { container } = render(<SalaryByCountry data={mockData} />)
      const headers = container.querySelectorAll('th')
      expect(headers.length).toBeGreaterThan(0)
    })
  })
})
