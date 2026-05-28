import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmployeeTable from './EmployeeTable'

describe('EmployeeTable', () => {
  const mockEmployees = [
    {
      id: 1,
      full_name: 'Alice Smith',
      job_title: 'Software Engineer',
      country: 'USA',
      department: 'Engineering',
      salary: '80000',
    },
    {
      id: 2,
      full_name: 'Bob Jones',
      job_title: 'Product Manager',
      country: 'UK',
      department: 'Product',
      salary: '90000',
    },
    {
      id: 3,
      full_name: 'Charlie Brown',
      job_title: 'Designer',
      country: 'Canada',
      department: 'Product',
      salary: '70000',
    },
  ]

  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders table headers', () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Job Title')).toBeInTheDocument()
      expect(screen.getByText('Country')).toBeInTheDocument()
      expect(screen.getByText('Department')).toBeInTheDocument()
      expect(screen.getByText('Salary')).toBeInTheDocument()
      expect(screen.getByText('Actions')).toBeInTheDocument()
    })

    it('renders all employee rows', () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      expect(screen.getByText('Alice Smith')).toBeInTheDocument()
      expect(screen.getByText('Bob Jones')).toBeInTheDocument()
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument()
    })

    it('renders employee details correctly', () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      expect(screen.getByText('Software Engineer')).toBeInTheDocument()
      expect(screen.getByText('Product Manager')).toBeInTheDocument()
      expect(screen.getByText('Designer')).toBeInTheDocument()
    })

    it('renders formatted salary with locale formatting', () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      const salaryTexts = screen.getAllByText(/\$/)
      expect(salaryTexts.length).toBeGreaterThan(0)
    })

    it('renders Edit button for each employee', () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      const editButtons = screen.getAllByText('Edit')
      expect(editButtons.length).toBe(mockEmployees.length)
    })

    it('renders Delete button for each employee', () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      const deleteButtons = screen.getAllByText('Delete')
      expect(deleteButtons.length).toBe(mockEmployees.length)
    })
  })

  describe('Empty State', () => {
    it('renders table with headers but no rows when employees list is empty', () => {
      render(
        <EmployeeTable
          employees={[]}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('calls onEdit with employee data when Edit button is clicked', async () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      const editButtons = screen.getAllByText('Edit')
      await userEvent.click(editButtons[0])
      expect(mockOnEdit).toHaveBeenCalledWith(mockEmployees[0])
    })

    it('calls onEdit with correct employee for each Edit button', async () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      const editButtons = screen.getAllByText('Edit')
      await userEvent.click(editButtons[1])
      expect(mockOnEdit).toHaveBeenCalledWith(mockEmployees[1])
    })

    it('calls onDelete with employee id when Delete button is clicked', async () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      const deleteButtons = screen.getAllByText('Delete')
      await userEvent.click(deleteButtons[0])
      expect(mockOnDelete).toHaveBeenCalledWith(mockEmployees[0].id)
    })

    it('calls onDelete with correct id for each Delete button', async () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      const deleteButtons = screen.getAllByText('Delete')
      await userEvent.click(deleteButtons[2])
      expect(mockOnDelete).toHaveBeenCalledWith(mockEmployees[2].id)
    })
  })

  describe('Data Display', () => {
    it('displays all employee countries', () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      expect(screen.getByText('USA')).toBeInTheDocument()
      expect(screen.getByText('UK')).toBeInTheDocument()
      expect(screen.getByText('Canada')).toBeInTheDocument()
    })

    it('displays all employee departments', () => {
      render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      const engineeringElements = screen.getAllByText('Engineering')
      const productElements = screen.getAllByText('Product')
      expect(engineeringElements.length).toBeGreaterThan(0)
      expect(productElements.length).toBeGreaterThan(0)
    })

    it('displays salary as formatted currency', () => {
      render(
        <EmployeeTable
          employees={[
            {
              id: 1,
              full_name: 'Test User',
              job_title: 'Engineer',
              country: 'USA',
              department: 'Engineering',
              salary: '100000.50',
            },
          ]}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      expect(screen.getByText('$100,000.5')).toBeInTheDocument()
    })
  })

  describe('Table Structure', () => {
    it('renders a valid HTML table structure', () => {
      const { container } = render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      expect(container.querySelector('table')).toBeInTheDocument()
      expect(container.querySelector('thead')).toBeInTheDocument()
      expect(container.querySelector('tbody')).toBeInTheDocument()
    })

    it('renders each employee in a table row', () => {
      const { container } = render(
        <EmployeeTable
          employees={mockEmployees}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )
      const rows = container.querySelectorAll('tbody tr')
      expect(rows.length).toBe(mockEmployees.length)
    })
  })
})
