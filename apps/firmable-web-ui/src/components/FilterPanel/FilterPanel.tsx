// components/FilterPanel.tsx
/** @jsxImportSource @emotion/react */
import React from 'react'
import { IFilters } from '../../types/types'
import * as S from './FilterPanel.styles'

export interface FilterPanelProps {
  filters: IFilters
  onFilterChange: (newFilters: Partial<IFilters>) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

const industries = [
  'Technology',
  'Construction',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Hospitality',
  'Agriculture',
  'Professional Services',
  'Logistics',
  'Education',
  'Security',
  'Consulting',
]
const states = ['VIC', 'NSW', 'QLD', 'WA', 'SA']
const revenueBands = ['0-1M', '1M-5M', '5M-10M', '10M-50M', '50M+']
const employeeRangeOptions = [
  { value: 1, label: '1-10 (Micro)' },
  { value: 2, label: '11-50 (Small)' },
  { value: 3, label: '51-200 (Medium)' },
  { value: 4, label: '201-1000 (Large)' },
  { value: 5, label: '1000+ (Enterprise)' },
]
const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ industry: e.target.value })
  }

  const handleEmployeeRangeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log('Employee Range Change', e.target.value)
    onFilterChange({ employeeRange: parseInt(e.target.value) })
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    const updatedStates = checked
      ? [...filters.states, value]
      : filters.states.filter(state => state.value !== value)
    // onFilterChange({ states: updatedStates })
  }

  const handleRevenueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ revenueBand: e.target.value })
  }

  if (!filters) {
    ;<span>no filters</span>
  }

  return (
    <S.Panel>
      <S.FilterHeading>Filters</S.FilterHeading>
      <S.FilterSection>
        <S.FilterTitle>Industry</S.FilterTitle>
        <label htmlFor="industryFilter">Select Industry</label>
        <select
          id="industryFilter"
          className="w-full p-2 border rounded"
          value={filters.industry}
          onChange={handleIndustryChange}
        >
          <option value="medium">All Industries</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </S.FilterSection>

      <S.FilterSection>
        <S.FilterTitle>No. of Employees</S.FilterTitle>
        <label htmlFor="companySizeSelect">Select number of employees</label>
        <select
          id="companySizeSelect"
          value={filters.employeeRange}
          onChange={handleEmployeeRangeChange}
        >
          {employeeRangeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Removed the original range labels as they are replaced by select options */}
      </S.FilterSection>

      <S.FilterSection>
        <S.FilterTitle>States</S.FilterTitle>
        {states.map(state => (
          <S.CheckboxItem key={state} className="checkbox-item">
            <input
              type="checkbox"
              id={`state${state}`}
              value={state}
              checked={filters.states.some(e => e.value === state)}
              onChange={handleStateChange}
            />
            <label htmlFor={`state${state}`}>{state}</label>
          </S.CheckboxItem>
        ))}
      </S.FilterSection>

      <S.FilterSection>
        <S.FilterTitle>Revenue Bands</S.FilterTitle>
        <select
          id="revenueFilter"
          className="w-full p-2 border rounded"
          value={filters.revenueBand}
          onChange={handleRevenueChange}
        >
          <option value="">All Revenue Bands</option>
          {revenueBands.map(band => (
            <option key={band} value={band}>
              ${band}
            </option>
          ))}
        </select>
      </S.FilterSection>

      <button
        onClick={onApplyFilters}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition mt-4"
      >
        Apply Filters
      </button>
      <button
        onClick={onResetFilters}
        className="w-full text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition mt-2"
      >
        Reset
      </button>
    </S.Panel>
  )
}

export default FilterPanel
