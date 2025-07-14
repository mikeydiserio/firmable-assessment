import React, { useEffect, useState } from "react";
import * as S from "./SearchBar.styles";

export interface Company {
  id: string;
  name: string;
  // ...other fields as needed
}

export interface SearchBarProps {
  placeholder?: string;
  onSelectSuggestion?: (companyName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSelectSuggestion,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Company[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/entities/search?q=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setSuggestions(Array.isArray(data) ? data : []);
        setShowSuggestions(Array.isArray(data) && data.length > 0);
      })
      .catch(() => setError("Failed to fetch suggestions"))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <S.SearchContainer>
      <S.SearchInput
        type="text"
        id="searchInput"
        placeholder={placeholder}
        autoComplete="off"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowSuggestions(suggestions.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {showSuggestions && (
        <S.SearchSuggestions>
          {suggestions.map((company) => (
            <S.SuggestionItem
              key={company.id}
              onMouseDown={() => {
                setSearchTerm(company.name);
                if (onSelectSuggestion) onSelectSuggestion(company.name);
              }}
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
