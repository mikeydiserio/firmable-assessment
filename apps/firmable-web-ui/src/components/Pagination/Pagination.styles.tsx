import styled from 'styled-components'

export const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
`
export const PaginationButton = styled.button`
	height: 48px;
	width: 48px;
	padding: 0.5rem 1rem;
	margin: 0 0.25rem;
	border-radius: 0.375rem;
	border: 1px solid #d1d5db;
	background-color: #a7e1ef;
	cursor: pointer;
	color: black;

	&:hover:not(.active) {
		background-color: #f3f4f6;
		color: #d1d5db;
	}

	&.active {
		background-color: var(--primary-color);
		color: white;
		border-color: var(--primary-color);
	}
`
