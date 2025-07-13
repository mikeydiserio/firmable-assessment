import React from "react"
import { Company, SortByOption } from "../../types/types"
import CompanyCard from "../CompanyCard/CompanyCard"
import * as S from "./SearchResults.styles"

export interface SearchResultsProps {
    companies: Company[]
    loading: boolean
    sortBy: SortByOption
    onSortChange: (sortBy: SortByOption) => void
    onViewDetails: (companyId: number) => void
}

const sortOptions = {
    "name-asc": "Name (A-Z)",
    "name-desc": "Name (Z-A)",
    "revenue-asc": "Revenue (Low-High)",
    "revenue-desc": "Revenue (High-Low)",
    "employees-asc": "Employees (Small-Large)",
    "employees-desc": "Employees (Large-Small)",
}

const SearchResults: React.FC<SearchResultsProps> = ({
    companies,
    loading,
    sortBy,
    onSortChange,
    onViewDetails,
}) => {
    return (
        <S.Container>
            <S.SearchResultsHeaderContainer>
                <S.SearchResultsHeader>Search Results</S.SearchResultsHeader>
                <S.SortByLabelContainer>
                    <label htmlFor="sortBy" >
                        <span>Sort by:</span>
                    </label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as SortByOption)}
                    >
                        {Object.entries(sortOptions).map(([value, text]) => (
                            <option key={value} value={value}>
                                {text}
                            </option>
                        ))}
                    </select>
                </S.SortByLabelContainer>
            </S.SearchResultsHeaderContainer>


            {loading && (
                <S.LoadingSpinner />
            )}

            {!loading && companies.length < 1 && (
                <S.NoResults>
                    <p className="text-gray-500">
                        No companies match your search criteria. Try widening your filters.
                    </p>
                </S.NoResults>
            )}

            {!loading && companies.length > 0 && (
                <div>
                    {companies.map((company) => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </div>
            )}
        </S.Container>
    )
}

export default SearchResults
