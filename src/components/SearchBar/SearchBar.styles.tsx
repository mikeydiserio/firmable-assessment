
import styled from '@emotion/styled';

export const SearchInput = styled.input`
    position: relative;
    min-width: 450px;
    width: auto;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    font-size: 1rem;
    transition: all 0.2s;
    height: auto;

    &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
    }
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid #d1d5db;
`

export const SearchSuggestions =styled.div`
    position: absolute;
    z-index: 10;
    width: 100%;
    background-color: white;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    overflow-y: auto;   
    top: 30px;
`;

export const SuggestionItem  = styled.div `
        color: black;
        padding: 0.75rem 1rem;
        cursor: pointer;

        &:hover {
            background-color: var(--light-gray);
        }
    `