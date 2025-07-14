import { useState } from "react";
import { searchEntities } from "../../lib/searchEntities";
import { Entity } from "../../types/types";

export default function EntitySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchEntities(query);
      setResults(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="entity-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ABN or name"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="results">
        {results.length > 0 ? (
          <ul>
            {results.map((entity) => (
              <li key={entity.abn}>
                <strong>{entity.legal_name}</strong> ({entity.abn})
                <p>Type: {entity.entity_type_code}</p>
              </li>
            ))}
          </ul>
        ) : !isLoading && query && !error ? (
          <p>No results found</p>
        ) : null}
      </div>
    </div>
  );
}
