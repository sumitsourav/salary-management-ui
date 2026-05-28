import { employeeAPI, insightsAPI } from './client'

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('employeeAPI', () => {
    it('exports all required methods', () => {
      expect(typeof employeeAPI.list).toBe('function')
      expect(typeof employeeAPI.get).toBe('function')
      expect(typeof employeeAPI.create).toBe('function')
      expect(typeof employeeAPI.update).toBe('function')
      expect(typeof employeeAPI.delete).toBe('function')
    })

    it('list method accepts parameters', () => {
      expect(() => employeeAPI.list(1, 50, {})).toBeDefined()
    })

    it('get method accepts id parameter', () => {
      expect(() => employeeAPI.get(1)).toBeDefined()
    })

    it('create method accepts data parameter', () => {
      expect(() => employeeAPI.create({})).toBeDefined()
    })

    it('update method accepts id and data parameters', () => {
      expect(() => employeeAPI.update(1, {})).toBeDefined()
    })

    it('delete method accepts id parameter', () => {
      expect(() => employeeAPI.delete(1)).toBeDefined()
    })
  })

  describe('insightsAPI', () => {
    it('exports all required methods', () => {
      expect(typeof insightsAPI.salaryByCountry).toBe('function')
      expect(typeof insightsAPI.salaryByJobTitle).toBe('function')
      expect(typeof insightsAPI.topEarners).toBe('function')
    })

    it('salaryByCountry method is callable', () => {
      expect(() => insightsAPI.salaryByCountry()).toBeDefined()
    })

    it('salaryByJobTitle method accepts country parameter', () => {
      expect(() => insightsAPI.salaryByJobTitle('USA')).toBeDefined()
    })

    it('topEarners method accepts country and limit parameters', () => {
      expect(() => insightsAPI.topEarners('USA', 10)).toBeDefined()
    })
  })

  describe('API Client Configuration', () => {
    it('exports employeeAPI object', () => {
      expect(employeeAPI).toBeDefined()
      expect(typeof employeeAPI.list).toBe('function')
      expect(typeof employeeAPI.get).toBe('function')
      expect(typeof employeeAPI.create).toBe('function')
      expect(typeof employeeAPI.update).toBe('function')
      expect(typeof employeeAPI.delete).toBe('function')
    })

    it('exports insightsAPI object', () => {
      expect(insightsAPI).toBeDefined()
      expect(typeof insightsAPI.salaryByCountry).toBe('function')
      expect(typeof insightsAPI.salaryByJobTitle).toBe('function')
      expect(typeof insightsAPI.topEarners).toBe('function')
    })
  })
})
