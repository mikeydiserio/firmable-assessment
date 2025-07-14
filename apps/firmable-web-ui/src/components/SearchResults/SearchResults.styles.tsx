import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	width: 100%;
`

export const NoResults = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	width: 100%;
`

export const SortByLabelContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const SortByInput = styled.select`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
	width: 100%;
`

export const SearchResultsHeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

export const SearchResultsHeader = styled.h2`
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 1rem;
	color: var(--primary-color);
`
export const SortBy = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 1rem;
	color: var(--primary-color);
`

export const ResultsList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	width: 100%;
`

export const LoadingSpinner = styled.div`
	display: inline-block;
	width: 2rem;
	height: 2rem;
	border: 3px solid rgba(79, 70, 229, 0.3);
	border-radius: 50%;
	border-top-color: var(--primary-color);
	animation: spin 1s ease-in-out infinite;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`
