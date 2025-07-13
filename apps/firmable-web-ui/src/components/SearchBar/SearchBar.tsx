
import React, { useEffect, useState } from 'react'
import { Company } from '../../types/types'
import * as S from './SearchBar.styles'

export interface SearchBarProps {
  placeholder?: string
  searchTerm: string
  onSearchChange: (term: string) => void
  suggestions: Company[]
  onSelectSuggestion: (companyName: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  searchTerm,
  onSearchChange,
  suggestions,
  onSelectSuggestion,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(true)

  useEffect(() => {
    setShowSuggestions(searchTerm.length > 0 && suggestions.length > 0)
  }, [searchTerm, suggestions])

  return (
    <S.SearchContainer>
      {/* <S.SearchIcon>
          <svg viewBox="0 0 50 50" width="50px" height="50px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg>
        </S.SearchIcon> */}
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
  )
}

export default SearchBar