import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmployeeFilters from './EmployeeFilters'

describe('EmployeeFilters', () => {
  const mockFilters = {
    search: '',
    country: '',
    department: '',
  }

  const mockCountries = ['USA', 'UK', 'India', 'Canada']
  const mockDepartments = ['Engineering', 'Product', 'HR', 'Sales']

  const mockOnFilterChange = jest.fn()
  const mockOnReset = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders search input field', () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )
      expect(
        screen.getByPlaceholderText('Search name, job title...')
      ).toBeInTheDocument()
    })

    it('renders country select dropdown', () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )
      expect(screen.getByDisplayValue('All Countries')).toBeInTheDocument()
    })

    it('renders department select dropdown', () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )
      expect(screen.getByDisplayValue('All Departments')).toBeInTheDocument()
    })

    it('renders Reset button', () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )
      expect(screen.getByText('Reset')).toBeInTheDocument()
    })

    it('renders all country options', () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )
      const countrySelect = screen.getByDisplayValue('All Countries')
      const options = countrySelect.querySelectorAll('option')
      expect(options.length).toBe(mockCountries.length + 1) // +1 for "All Countries"
    })

    it('renders all department options', () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )
      const deptSelect = screen.getByDisplayValue('All Departments')
      const options = deptSelect.querySelectorAll('option')
      expect(options.length).toBe(mockDepartments.length + 1) // +1 for "All Departments"
    })
  })

  describe('Filter Synchronization', () => {
    it('updates search input when filters prop changes', () => {
      const { rerender } = render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      const searchInput = screen.getByPlaceholderText('Search name, job title...')
      expect(searchInput.value).toBe('')

      rerender(
        <EmployeeFilters
          filters={{ search: 'Alice', country: '', department: '' }}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      expect(searchInput.value).toBe('Alice')
    })

    it('updates country select when filters prop changes', () => {
      const { rerender } = render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      let countrySelect = screen.getByDisplayValue('All Countries')
      expect(countrySelect.value).toBe('')

      rerender(
        <EmployeeFilters
          filters={{ search: '', country: 'USA', department: '' }}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      countrySelect = screen.getByDisplayValue('USA')
      expect(countrySelect.value).toBe('USA')
    })

    it('updates department select when filters prop changes', () => {
      const { rerender } = render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      let deptSelect = screen.getByDisplayValue('All Departments')
      expect(deptSelect.value).toBe('')

      rerender(
        <EmployeeFilters
          filters={{ search: '', country: '', department: 'Engineering' }}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      deptSelect = screen.getByDisplayValue('Engineering')
      expect(deptSelect.value).toBe('Engineering')
    })
  })

  describe('User Interactions', () => {
    it('calls onFilterChange when search input changes', async () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      const searchInput = screen.getByPlaceholderText('Search name, job title...')
      await userEvent.type(searchInput, 'Alice')

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        search: 'Alice',
        country: '',
        department: '',
      })
    })

    it('calls onFilterChange when country select changes', async () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      const countrySelect = screen.getByDisplayValue('All Countries')
      fireEvent.change(countrySelect, { target: { value: 'USA' } })

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        search: '',
        country: 'USA',
        department: '',
      })
    })

    it('calls onFilterChange when department select changes', async () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      const deptSelect = screen.getByDisplayValue('All Departments')
      fireEvent.change(deptSelect, { target: { value: 'Engineering' } })

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        search: '',
        country: '',
        department: 'Engineering',
      })
    })

    it('calls onReset when Reset button is clicked', async () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      const resetButton = screen.getByText('Reset')
      await userEvent.click(resetButton)

      expect(mockOnReset).toHaveBeenCalled()
    })
  })

  describe('Combined Filters', () => {
    it('updates all filters together correctly', async () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      const searchInput = screen.getByPlaceholderText('Search name, job title...')
      const countrySelect = screen.getByDisplayValue('All Countries')
      const deptSelect = screen.getByDisplayValue('All Departments')

      await userEvent.type(searchInput, 'John')
      fireEvent.change(countrySelect, { target: { value: 'UK' } })
      fireEvent.change(deptSelect, { target: { value: 'Product' } })

      expect(mockOnFilterChange).toHaveBeenLastCalledWith({
        search: 'John',
        country: 'UK',
        department: 'Product',
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles empty country list', () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={[]}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      const countrySelect = screen.getByDisplayValue('All Countries')
      expect(countrySelect).toBeInTheDocument()
    })

    it('handles empty department list', () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={[]}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      const deptSelect = screen.getByDisplayValue('All Departments')
      expect(deptSelect).toBeInTheDocument()
    })

    it('handles special characters in search', async () => {
      render(
        <EmployeeFilters
          filters={mockFilters}
          countries={mockCountries}
          departments={mockDepartments}
          onFilterChange={mockOnFilterChange}
          onReset={mockOnReset}
        />
      )

      const searchInput = screen.getByPlaceholderText('Search name, job title...')
      await userEvent.type(searchInput, "O'Brien & Co.")

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        search: "O'Brien & Co.",
        country: '',
        department: '',
      })
    })
  })
})
