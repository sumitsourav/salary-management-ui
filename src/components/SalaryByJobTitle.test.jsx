import { render, screen } from '@testing-library/react'
import SalaryByJobTitle from './SalaryByJobTitle'

describe('SalaryByJobTitle', () => {
  const mockData = [
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
    {
      job_title: 'Designer',
      avg_salary: '75000',
      employee_count: 15,
    },
  ]

  const mockCountry = 'USA'

  describe('Rendering', () => {
    it('renders component title with country name', () => {
      render(<SalaryByJobTitle data={mockData} country={mockCountry} />)
      expect(
        screen.getByText(`Average Salary by Job Title in ${mockCountry}`)
      ).toBeInTheDocument()
    })

    it('renders table headers', () => {
      render(<SalaryByJobTitle data={mockData} country={mockCountry} />)
      expect(screen.getByText('Job Title')).toBeInTheDocument()
      expect(screen.getByText('Average Salary')).toBeInTheDocument()
      expect(screen.getByText('Employees')).toBeInTheDocument()
    })

    it('renders all job titles', () => {
      render(<SalaryByJobTitle data={mockData} country={mockCountry} />)
      expect(screen.getByText('Software Engineer')).toBeInTheDocument()
      expect(screen.getByText('Product Manager')).toBeInTheDocument()
      expect(screen.getByText('Designer')).toBeInTheDocument()
    })

    it('renders all data rows', () => {
      const { container } = render(
        <SalaryByJobTitle data={mockData} country={mockCountry} />
      )
      const rows = container.querySelectorAll('tbody tr')
      expect(rows.length).toBe(mockData.length)
    })

    it('renders all salary values', () => {
      render(<SalaryByJobTitle data={mockData} country={mockCountry} />)
      const salaryTexts = screen.getAllByText(/^\$/)
      expect(salaryTexts.length).toBe(mockData.length)
    })

    it('renders all employee counts', () => {
      render(<SalaryByJobTitle data={mockData} country={mockCountry} />)
      expect(screen.getByText('25')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('15')).toBeInTheDocument()
    })
  })

  describe('Data Display', () => {
    it('displays formatted salary correctly', () => {
      render(<SalaryByJobTitle data={mockData} country={mockCountry} />)
      expect(screen.getByText('$90,000')).toBeInTheDocument()
      expect(screen.getByText('$95,000')).toBeInTheDocument()
      expect(screen.getByText('$75,000')).toBeInTheDocument()
    })

    it('removes fraction digits from salary display', () => {
      const dataWithDecimals = [
        {
          job_title: 'Engineer',
          avg_salary: '90000.99',
          employee_count: 25,
        },
      ]
      render(
        <SalaryByJobTitle data={dataWithDecimals} country={mockCountry} />
      )
      expect(screen.getByText('$90,001')).toBeInTheDocument()
    })

    it('handles large salary numbers with comma formatting', () => {
      const largeData = [
        {
          job_title: 'Executive',
          avg_salary: '500000',
          employee_count: 5,
        },
      ]
      render(<SalaryByJobTitle data={largeData} country={mockCountry} />)
      expect(screen.getByText('$500,000')).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('renders table with headers but no data when data array is empty', () => {
      const { container } = render(
        <SalaryByJobTitle data={[]} country={mockCountry} />
      )
      expect(
        screen.getByText(`Average Salary by Job Title in ${mockCountry}`)
      ).toBeInTheDocument()
      const rows = container.querySelectorAll('tbody tr')
      expect(rows.length).toBe(0)
    })
  })

  describe('Country Variations', () => {
    it('displays correct country name in title for different countries', () => {
      const { rerender } = render(
        <SalaryByJobTitle data={mockData} country="USA" />
      )
      expect(
        screen.getByText('Average Salary by Job Title in USA')
      ).toBeInTheDocument()

      rerender(<SalaryByJobTitle data={mockData} country="UK" />)
      expect(
        screen.getByText('Average Salary by Job Title in UK')
      ).toBeInTheDocument()

      rerender(<SalaryByJobTitle data={mockData} country="India" />)
      expect(
        screen.getByText('Average Salary by Job Title in India')
      ).toBeInTheDocument()
    })
  })

  describe('Table Structure', () => {
    it('renders a valid HTML table structure', () => {
      const { container } = render(
        <SalaryByJobTitle data={mockData} country={mockCountry} />
      )
      expect(container.querySelector('table')).toBeInTheDocument()
      expect(container.querySelector('thead')).toBeInTheDocument()
      expect(container.querySelector('tbody')).toBeInTheDocument()
    })

    it('has correct table styling classes', () => {
      const { container } = render(
        <SalaryByJobTitle data={mockData} country={mockCountry} />
      )
      const table = container.querySelector('table')
      expect(table.className).toContain('min-w-full')
    })
  })

  describe('Row Rendering', () => {
    it('uses job_title as the key for each row', () => {
      const { container } = render(
        <SalaryByJobTitle data={mockData} country={mockCountry} />
      )
      const rows = container.querySelectorAll('tbody tr')
      expect(rows[0]).toBeInTheDocument()
      expect(rows[1]).toBeInTheDocument()
      expect(rows[2]).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('has overflow-x-auto class for horizontal scrolling', () => {
      const { container } = render(
        <SalaryByJobTitle data={mockData} country={mockCountry} />
      )
      const wrapper = container.querySelector('.overflow-x-auto')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('renders proper semantic table structure', () => {
      const { container } = render(
        <SalaryByJobTitle data={mockData} country={mockCountry} />
      )
      expect(container.querySelector('thead')).toBeInTheDocument()
      expect(container.querySelector('tbody')).toBeInTheDocument()
    })

    it('has proper table header elements', () => {
      const { container } = render(
        <SalaryByJobTitle data={mockData} country={mockCountry} />
      )
      const headers = container.querySelectorAll('th')
      expect(headers.length).toBe(3)
    })
  })
})
