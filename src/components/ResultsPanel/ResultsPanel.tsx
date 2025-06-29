/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const resultsStyle = css`
  width: 100%;
  @media (min-width: 768px) {
    width: 75%;
  }

  h2 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  

  .loading {
    display: none;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .pagination {
    margin-top: 2rem;
  }
`

export default function ResultsPanel() {
  return (
    <div css={resultsStyle}>
      <div className="sort-bar">
        <h2>Search Results</h2>
        <div>
          <label htmlFor="sortBy" style={{ marginRight: '0.5rem' }}>Sort by:</label>
          <select id="sortBy">
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="revenue-asc">Revenue (Low-High)</option>
            <option value="revenue-desc">Revenue (High-Low)</option>
            <option value="employees-asc">Employees (Small-Large)</option>
            <option value="employees-desc">Employees (Large-Small)</option>
          </select>
        </div>
      </div>

      <div id="loadingIndicator" className="loading">
        <span>Loading companies...</span>
      </div>

      <div id="resultsContainer">{/* TODO: Render results here */}</div>
      <div id="paginationContainer" className="pagination">{/* TODO: Render pagination here */}</div>
    </div>
  )
}
