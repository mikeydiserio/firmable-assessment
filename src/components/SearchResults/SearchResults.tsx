import React from "react";
import { Company, SortByOption } from "../../types/types";
import CompanyCard from "../CompanyCard/CompanyCard";
import * as S from "./SearchResults.styles";

export interface SearchResultsProps {
    companies: Company[];
    loading: boolean;
    sortBy: SortByOption;
    onSortChange: (sortBy: SortByOption) => void;
    onViewDetails: (companyId: number) => void;
}

const sortOptions = {
    "name-asc": "Name (A-Z)",
    "name-desc": "Name (Z-A)",
    "revenue-asc": "Revenue (Low-High)",
    "revenue-desc": "Revenue (High-Low)",
    "employees-asc": "Employees (Small-Large)",
    "employees-desc": "Employees (Large-Small)",
};

const SearchResults: React.FC<SearchResultsProps> = ({
    companies,
    loading,
    sortBy,
    onSortChange,
    onViewDetails,
}) => {
    if (!companies || companies.length === 0) {
        return null;
    }
    return (
    <div className="w-full md:w-3/4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Search Results</h2>
            <div className="flex items-center">
                <span className="mr-2">Sort by:</span>
                <select
                    id="sortBy"
                    className="p-2 border rounded"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortByOption)}
                >
                    {Object.entries(sortOptions).map(([value, text]) => (
                        <option key={value} value={value}>
                            {text}
                        </option>
                    ))}
                </select>
            </div>
        </div>

        {loading && (
            <div className="flex justify-center items-center py-8">
            <S.LoadingSpinner />
            <span className="ml-2">Loading companies...</span>
        </div>
        )}

        {!loading && companies.length === 0 && (
            <div className="text-center py-8">
            <p className="text-gray-500">
                No companies match your search criteria. Try widening your filters.
            </p>
            </div>
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
        </div>
    );
};

export default SearchResults;
