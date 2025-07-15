import { useEffect, useState } from 'react'
import { contentData } from '../../mocks/content'
import { SortByOption } from '../../types/types'
import * as S from './SearchResults.styles'
export interface SearchResultsProps {
  searchTerm: string
  filters: string
  sortBy: SortByOption
  onSortChange: (sortBy: SortByOption) => void
  onViewDetails: (companyId: string) => void
}

export const SearchResults = ({
  searchTerm,
  filters,
  sortBy,
  onSortChange,
}: SearchResultsProps) => {
  const [allListings, setAllListings] = useState<any[]>([])

  useEffect(() => {
    const params = new URLSearchParams({ searchTerm, filters })
    fetch(`/api/companies?${params}`)
      .then(res => {
        console.log('Response status:', res.status)
        res.json()
      })
      .then(data => {
        console.log('Fetched data:', data)
        setAllListings(data as any)
      })
  }, [searchTerm, filters])

  return (
    <S.Container>
      <S.SearchResultsHeaderContainer>
        <S.SearchResultsHeader>Search Results</S.SearchResultsHeader>
        {allListings.length > 0 && (
          <ul>
            {allListings.map(listing => (
              <li key={listing.entity.abn}>
                <p>listing details here </p>
              </li>
            ))}
          </ul>
        )}
        <S.SortByLabelContainer>
          <label htmlFor="sortBy">
            <span>Sort by:</span>
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={e => onSortChange(e.target.value as SortByOption)}
          >
            {contentData.sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </S.SortByLabelContainer>
      </S.SearchResultsHeaderContainer>

      {/* add more searchable things here */}
      {/* {!loading && companies.length > 0 && (
        <div>
          {companies.map((company: Company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onViewDetails={() => onViewDetails(company.id)}
            />
          ))}
        </div>
      )} */}
    </S.Container>
  )
}
