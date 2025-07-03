'use client'
import ClientProviderWrapper from '@/components/ClientProviderWrapper'
import CompanyDetailModal from '@/components/CompanyDetailModal/CompanyDetailModal'
import FilterPanel from '@/components/FilterPanel/FilterPanel'
import Pagination from '@/components/Pagination/Pagination'
import SearchBar from '@/components/SearchBar/SearchBar'
import SearchResults from '@/components/SearchResults/SearchResults'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { sampleCompanies } from '../data/companies'
import type { Company, IFilters, SortByOption } from '../types/types'
import { getEmployeeCountRange, revenueBandToValue } from '../utils/helpers'
import * as S from './page.styles'

export const Home: React.FC = () => {
	const [filters, setFilters] = useState<IFilters>({
		searchTerm: '',
		industry: '',
		employeeRange: 5, // Corresponds to 'Enterprise' initially
		states: ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'], // All checked by default
		revenueBand: '',
	})

	const [searchTerm, setSearchTerm] = useState<string>('')

	const [sortBy, setSortBy] = useState<SortByOption>('name-asc')
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [loading, setLoading] = useState<boolean>(false)
	const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

	const itemsPerPage = 5

	//  300ms debounce delay search term for suggestions and main search
	const [debouncedSearchTerm, setDebouncedSearchTerm] =
		useState<string>(searchTerm)

	useEffect(() => {
		setFilters({
			searchTerm: '',
			industry: '',
			employeeRange: 4,
			states: ['VIC', 'NSW', 'QLD', 'WA', 'SA'],
			revenueBand: '',
		})
		setSearchTerm('')
		setSortBy('name-asc')
		setCurrentPage(1)
		setLoading(false)
	}, [])

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm)
		}, 300) //

		return () => {
			clearTimeout(handler)
		}
	}, [searchTerm])

	const allCompanies: Company[] = useMemo(() => sampleCompanies, [])

	const filteredAndSortedCompanies = useMemo(() => {
		let currentCompanies = [...allCompanies]

		if (debouncedSearchTerm) {
			const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase()
			currentCompanies = currentCompanies.filter(
				company =>
					company.name.toLowerCase().includes(lowerCaseSearchTerm) ||
					company.abn.includes(lowerCaseSearchTerm) ||
					company.industry.toLowerCase().includes(lowerCaseSearchTerm) ||
					company.address.suburb.toLowerCase().includes(lowerCaseSearchTerm) ||
					company.address.state.toLowerCase().includes(lowerCaseSearchTerm),
			)
		}

		// Apply filters from FilterPanel
		currentCompanies = currentCompanies.filter(company => {
			// Industry filter
			const matchesIndustry =
				filters.industry === '' || company.industry === filters.industry

			// Employee size filter
			const [minEmployees, maxEmployees] = getEmployeeCountRange(
				filters.employeeRange,
			)
			const matchesEmployeeSize =
				company.employeeCount >= minEmployees &&
				company.employeeCount <= maxEmployees

			// State filter
			const matchesState =
				filters.states.length === 0 ||
				filters.states.includes(company.address.state)

			// Revenue band filter
			const matchesRevenueBand =
				filters.revenueBand === '' ||
				company.revenueBand === filters.revenueBand

			return (
				matchesIndustry &&
				matchesEmployeeSize &&
				matchesState &&
				matchesRevenueBand
			)
		})

		currentCompanies.sort((a, b) => {
			switch (sortBy) {
				case 'name-asc':
					return a.name.localeCompare(b.name)
				case 'name-desc':
					return b.name.localeCompare(a.name)
				case 'revenue-asc':
					return (
						revenueBandToValue(a.revenueBand) -
						revenueBandToValue(b.revenueBand)
					)
				case 'revenue-desc':
					return (
						revenueBandToValue(b.revenueBand) -
						revenueBandToValue(a.revenueBand)
					)
				case 'employees-asc':
					return a.employeeCount - b.employeeCount
				case 'employees-desc':
					return b.employeeCount - a.employeeCount
				default:
					return 0
			}
		})

		return currentCompanies
	}, [allCompanies, debouncedSearchTerm, filters, sortBy])

	const totalPages = Math.ceil(filteredAndSortedCompanies.length / itemsPerPage)

	const paginatedCompanies = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = Math.min(
			startIndex + itemsPerPage,
			filteredAndSortedCompanies.length,
		)
		return filteredAndSortedCompanies.slice(startIndex, endIndex)
	}, [currentPage, filteredAndSortedCompanies, itemsPerPage])

	const handleSearchChange = useCallback((term: string) => {
		setSearchTerm(term)
		setCurrentPage(1) // Reset to first page on search
	}, [])

	const handleFilterChange = useCallback((newFilters: Partial<IFilters>) => {
		setFilters(prevFilters => ({ ...prevFilters, ...newFilters }))
	}, [])

	const handleApplyFilters = useCallback(() => {
		setLoading(true)
		setCurrentPage(1)
		setTimeout(() => {
			setLoading(false)
			// Actual filtering happens in useMemo, so nothing explicit to do here except end loading
		}, 500)
	}, [])

	const handleResetFilters = useCallback(() => {
		setFilters({
			searchTerm: '',
			industry: '',
			employeeRange: 4,
			states: ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'ACT'],
			revenueBand: '',
		})
		setSearchTerm('')
		setSortBy('name-asc')
		setCurrentPage(1)
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 500)
	}, [])

	const handleSortChange = useCallback((newSortBy: SortByOption) => {
		setSortBy(newSortBy)
		setCurrentPage(1) // Reset to first page on sort change
	}, [])
	s
	const handlePageChange = useCallback((page: number) => {
		setCurrentPage(page)
	}, [])

	const handleViewDetails = useCallback(
		(companyId: number) => {
			const company = allCompanies.find(c => c.id === companyId)
			setSelectedCompany(company || null)
		},
		[allCompanies],
	)

	const handleCloseModal = useCallback(() => {
		setSelectedCompany(null)
	}, [])

	const searchSuggestions = useMemo(() => {
		if (!searchTerm) return []
		const lowerCaseSearchTerm = searchTerm.toLowerCase()
		return allCompanies
			.filter(
				company =>
					company.name.toLowerCase().includes(lowerCaseSearchTerm) ||
					company.abn.includes(lowerCaseSearchTerm) ||
					company.industry.toLowerCase().includes(lowerCaseSearchTerm) ||
					company.address.suburb.toLowerCase().includes(lowerCaseSearchTerm) ||
					company.address.state.toLowerCase().includes(lowerCaseSearchTerm),
			)
			.slice(0, 5) // Limit suggestions to 5
	}, [searchTerm, allCompanies])

	const handleSelectSuggestion = useCallback(
		(companyName: string) => {
			setSearchTerm(companyName)
			const company = allCompanies.find(c => c.name === companyName)
			setSelectedCompany(company || null)
		},
		[allCompanies],
	)

	return (
		<S.Page>
			<ClientProviderWrapper>
				<SearchBar
					placeholder="Search for companies, industries, or locations"
					searchTerm={searchTerm}
					onSearchChange={handleSearchChange}
					suggestions={searchSuggestions}
					onSelectSuggestion={handleSelectSuggestion}
				/>
				<S.Main>
					<FilterPanel
						filters={filters}
						onFilterChange={handleFilterChange}
						onApplyFilters={handleApplyFilters}
						onResetFilters={handleResetFilters}
					/>

					<div>
						<SearchResults
							companies={paginatedCompanies}
							loading={loading}
							sortBy={sortBy}
							onSortChange={handleSortChange}
							onViewDetails={handleViewDetails}
						/>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				</S.Main>
				<CompanyDetailModal
					company={selectedCompany}
					onClose={handleCloseModal}
				/>
			</ClientProviderWrapper>
		</S.Page>
	)
}

export default Home
