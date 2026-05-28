import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmployeeForm from './EmployeeForm'

describe('EmployeeForm', () => {
  const mockFormData = {
    id: 1,
    full_name: 'John Doe',
    job_title: 'Software Engineer',
    country: 'USA',
    salary: '80000',
    department: 'Engineering',
  }

  const mockOnChange = jest.fn()
  const mockOnSubmit = jest.fn((e) => e.preventDefault())
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders the form title as "Add Employee" when no id is provided', () => {
      const dataWithoutId = { ...mockFormData }
      delete dataWithoutId.id
      render(
        <EmployeeForm
          data={dataWithoutId}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      expect(screen.getByText('Add Employee')).toBeInTheDocument()
    })

    it('renders the form title as "Edit Employee" when id is provided', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      expect(screen.getByText('Edit Employee')).toBeInTheDocument()
    })

    it('renders all required input fields', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
      expect(screen.getByLabelText('Job Title')).toBeInTheDocument()
      expect(screen.getByLabelText('Country')).toBeInTheDocument()
      expect(screen.getByLabelText('Department')).toBeInTheDocument()
      expect(screen.getByLabelText('Salary')).toBeInTheDocument()
    })

    it('renders Save and Cancel buttons', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      expect(screen.getByText('Save')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('populates form fields with provided data', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Software Engineer')).toBeInTheDocument()
      expect(screen.getByDisplayValue('USA')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Engineering')).toBeInTheDocument()
      expect(screen.getByDisplayValue('80000')).toBeInTheDocument()
    })
  })

  describe('Job Title Options', () => {
    it('renders all job title options', () => {
      const { container } = render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      const jobTitleSelect = screen.getByLabelText('Job Title')
      const options = jobTitleSelect.querySelectorAll('option')
      expect(options.length).toBeGreaterThan(0)
    })
  })

  describe('Country Options', () => {
    it('renders all country options', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      const countrySelect = screen.getByLabelText('Country')
      const options = countrySelect.querySelectorAll('option')
      expect(options.length).toBeGreaterThan(0)
    })
  })

  describe('Department Options', () => {
    it('renders all department options', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      const deptSelect = screen.getByLabelText('Department')
      const options = deptSelect.querySelectorAll('option')
      expect(options.length).toBeGreaterThan(0)
    })
  })

  describe('User Interactions', () => {
    it('calls onChange when full name input changes', async () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      const input = screen.getByLabelText('Full Name')
      fireEvent.change(input, { target: { value: 'Jane Smith' } })
      expect(mockOnChange).toHaveBeenCalledWith('full_name', 'Jane Smith')
    })

    it('calls onChange when job title select changes', async () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      const select = screen.getByLabelText('Job Title')
      fireEvent.change(select, { target: { value: 'Product Manager' } })
      expect(mockOnChange).toHaveBeenCalledWith('job_title', 'Product Manager')
    })

    it('calls onChange when country select changes', async () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      const select = screen.getByLabelText('Country')
      fireEvent.change(select, { target: { value: 'UK' } })
      expect(mockOnChange).toHaveBeenCalledWith('country', 'UK')
    })

    it('calls onChange when department select changes', async () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      const select = screen.getByLabelText('Department')
      fireEvent.change(select, { target: { value: 'Product' } })
      expect(mockOnChange).toHaveBeenCalledWith('department', 'Product')
    })

    it('calls onChange when salary input changes', async () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      const input = screen.getByLabelText('Salary')
      fireEvent.change(input, { target: { value: '90000' } })
      expect(mockOnChange).toHaveBeenCalledWith('salary', '90000')
    })

    it('calls onSubmit when Save button is clicked', async () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      const saveButton = screen.getByText('Save')
      await userEvent.click(saveButton)
      expect(mockOnSubmit).toHaveBeenCalled()
    })

    it('calls onCancel when Cancel button is clicked', async () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      const cancelButton = screen.getByText('Cancel')
      await userEvent.click(cancelButton)
      expect(mockOnCancel).toHaveBeenCalled()
    })
  })

  describe('Form Validation', () => {
    it('marks full name as required', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      expect(screen.getByLabelText('Full Name')).toBeRequired()
    })

    it('marks salary as required', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      expect(screen.getByLabelText('Salary')).toBeRequired()
    })

    it('marks job title as required', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      expect(screen.getByLabelText('Job Title')).toBeRequired()
    })

    it('marks country as required', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      expect(screen.getByLabelText('Country')).toBeRequired()
    })

    it('marks department as required', () => {
      render(
        <EmployeeForm
          data={mockFormData}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )
      expect(screen.getByLabelText('Department')).toBeRequired()
    })
  })
})
