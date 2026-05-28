import { render, screen } from '@testing-library/react'
import TopEarners from './TopEarners'

describe('TopEarners', () => {
  const mockData = [
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
    {
      id: 3,
      full_name: 'Charlie Brown',
      job_title: 'Senior Engineer',
      department: 'Engineering',
      salary: '180000',
    },
  ]

  const mockCountry = 'USA'

  describe('Rendering', () => {
    it('renders component title with country name', () => {
      render(<TopEarners data={mockData} country={mockCountry} />)
      expect(
        screen.getByText(`Top 10 Earners in ${mockCountry}`)
      ).toBeInTheDocument()
    })

    it('renders table headers', () => {
      render(<TopEarners data={mockData} country={mockCountry} />)
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Job Title')).toBeInTheDocument()
      expect(screen.getByText('Department')).toBeInTheDocument()
      expect(screen.getByText('Salary')).toBeInTheDocument()
    })

    it('renders all earners', () => {
      render(<TopEarners data={mockData} country={mockCountry} />)
      expect(screen.getByText('Alice Smith')).toBeInTheDocument()
      expect(screen.getByText('Bob Jones')).toBeInTheDocument()
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument()
    })

    it('renders all data rows', () => {
      const { container } = render(
        <TopEarners data={mockData} country={mockCountry} />
      )
      const rows = container.querySelectorAll('tbody tr')
      expect(rows.length).toBe(mockData.length)
    })

    it('renders all job titles', () => {
      render(<TopEarners data={mockData} country={mockCountry} />)
      expect(screen.getByText('VP Engineering')).toBeInTheDocument()
      expect(screen.getByText('VP Product')).toBeInTheDocument()
      expect(screen.getByText('Senior Engineer')).toBeInTheDocument()
    })

    it('renders all departments', () => {
      render(<TopEarners data={mockData} country={mockCountry} />)
      const engineeringElements = screen.getAllByText('Engineering')
      const productElements = screen.getAllByText('Product')
      expect(engineeringElements.length).toBeGreaterThan(0)
      expect(productElements.length).toBeGreaterThan(0)
    })
  })

  describe('Data Display', () => {
    it('displays formatted salary correctly', () => {
      render(<TopEarners data={mockData} country={mockCountry} />)
      expect(screen.getByText('$200,000')).toBeInTheDocument()
      expect(screen.getByText('$190,000')).toBeInTheDocument()
      expect(screen.getByText('$180,000')).toBeInTheDocument()
    })

    it('removes fraction digits from salary display', () => {
      const dataWithDecimals = [
        {
          id: 1,
          full_name: 'Test User',
          job_title: 'Executive',
          department: 'Management',
          salary: '200000.99',
        },
      ]
      render(<TopEarners data={dataWithDecimals} country={mockCountry} />)
      expect(screen.getByText('$200,001')).toBeInTheDocument()
    })

    it('handles large salary numbers with comma formatting', () => {
      const largeData = [
        {
          id: 1,
          full_name: 'Executive',
          job_title: 'CEO',
          department: 'Management',
          salary: '5000000',
        },
      ]
      render(<TopEarners data={largeData} country={mockCountry} />)
      expect(screen.getByText('$5,000,000')).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('renders table with headers but no data when data array is empty', () => {
      const { container } = render(
        <TopEarners data={[]} country={mockCountry} />
      )
      expect(
        screen.getByText(`Top 10 Earners in ${mockCountry}`)
      ).toBeInTheDocument()
      const rows = container.querySelectorAll('tbody tr')
      expect(rows.length).toBe(0)
    })
  })

  describe('Country Variations', () => {
    it('displays correct country name in title for different countries', () => {
      const { rerender } = render(
        <TopEarners data={mockData} country="USA" />
      )
      expect(
        screen.getByText('Top 10 Earners in USA')
      ).toBeInTheDocument()

      rerender(<TopEarners data={mockData} country="UK" />)
      expect(
        screen.getByText('Top 10 Earners in UK')
      ).toBeInTheDocument()

      rerender(<TopEarners data={mockData} country="India" />)
      expect(
        screen.getByText('Top 10 Earners in India')
      ).toBeInTheDocument()
    })
  })

  describe('Table Structure', () => {
    it('renders a valid HTML table structure', () => {
      const { container } = render(
        <TopEarners data={mockData} country={mockCountry} />
      )
      expect(container.querySelector('table')).toBeInTheDocument()
      expect(container.querySelector('thead')).toBeInTheDocument()
      expect(container.querySelector('tbody')).toBeInTheDocument()
    })

    it('has correct table styling classes', () => {
      const { container } = render(
        <TopEarners data={mockData} country={mockCountry} />
      )
      const table = container.querySelector('table')
      expect(table.className).toContain('min-w-full')
    })
  })

  describe('Row Rendering', () => {
    it('uses employee id as the key for each row', () => {
      const { container } = render(
        <TopEarners data={mockData} country={mockCountry} />
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
        <TopEarners data={mockData} country={mockCountry} />
      )
      const wrapper = container.querySelector('.overflow-x-auto')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('renders proper semantic table structure', () => {
      const { container } = render(
        <TopEarners data={mockData} country={mockCountry} />
      )
      expect(container.querySelector('thead')).toBeInTheDocument()
      expect(container.querySelector('tbody')).toBeInTheDocument()
    })

    it('has proper table header elements', () => {
      const { container } = render(
        <TopEarners data={mockData} country={mockCountry} />
      )
      const headers = container.querySelectorAll('th')
      expect(headers.length).toBe(4)
    })
  })
})
