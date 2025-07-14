import React from 'react'
import { useGetEntities } from '../../hooks/useGetEntities'
import { Entity, SortByOption } from '../../types/types'
import EntityCard from '../EntityCard/EntityCard'
import * as S from './SearchResults.styles'

export interface SearchResultsProps {
  query: string
  sortBy: SortByOption
  onSortChange: (sortBy: SortByOption) => void
  onViewDetails: (companyId: string) => void
}

const sortOptions = {
  'name-asc': 'Name (A-Z)',
  'name-desc': 'Name (Z-A)',
  'revenue-asc': 'Revenue (Low-High)',
  'revenue-desc': 'Revenue (High-Low)',
  'employees-asc': 'Employees (Small-Large)',
  'employees-desc': 'Employees (Large-Small)',
}

const SearchResults: React.FC<SearchResultsProps> = ({
  sortBy,
  onSortChange,
  onViewDetails,
}) => {
  const { entities, isLoading, error } = useGetEntities()

  return (
    <S.Container>
      <S.SearchResultsHeaderContainer>
        <S.SearchResultsHeader>Search Results</S.SearchResultsHeader>
        {entities.length > 0 ? (
          <ul>
            {entities.map((entity: Entity) => (
              <li key={entity.abn}>
                <strong>{entity.legal_name}</strong> ({entity.abn})
                <p>Type: {entity.entity_type_code}</p>
                <EntityCard
                  onViewDetails={() => onViewDetails(entity.abn)}
                  entity={entity}
                />
              </li>
            ))}
          </ul>
        ) : !isLoading && entities && !error ? (
          <p>No results found</p>
        ) : null}
        <S.SortByLabelContainer>
          <label htmlFor="sortBy">
            <span>Sort by:</span>
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={e => onSortChange(e.target.value as SortByOption)}
          >
            {Object.entries(sortOptions).map(([value, text]) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </S.SortByLabelContainer>
      </S.SearchResultsHeaderContainer>

      {isLoading && <S.LoadingSpinner />}

      {!isLoading && entities.length < 1 && (
        <S.NoResults>
          <p>
            No companies match your search criteria. Try widening your filters.
          </p>
        </S.NoResults>
      )}
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

export default SearchResults
