
import React, { useEffect, useState } from 'react';
import { Company } from '../../types/types';
import * as S from './SearchBar.styles';

export interface SearchBarProps {
  placeholder?: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  suggestions: Company[];
  onSelectSuggestion: (companyName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder,
    searchTerm,
    onSearchChange,
    suggestions,
    onSelectSuggestion,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  useEffect(() => {
    setShowSuggestions(searchTerm.length > 0 && suggestions.length > 0);
  }, [searchTerm, suggestions]);

  return (
    <S.SearchContainer>
      <S.SearchInput
        type="text"
        id="searchInput"
        placeholder={placeholder}
        autoComplete="off"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setShowSuggestions(searchTerm.length > 0 && suggestions.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay to allow click on suggestion
      />
      {showSuggestions && (
        <S.SearchSuggestions>
          {suggestions.map((company) => (
            <S.SuggestionItem
              key={company.id}
              onMouseDown={() => onSelectSuggestion(company.name)} // Use onMouseDown to trigger before onBlur
            >
              {company.name}
            </S.SuggestionItem>
          ))}
        </S.SearchSuggestions>
      )}
    </S.SearchContainer>
  );
};

export default SearchBar;