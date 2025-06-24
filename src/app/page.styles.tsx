import styled from "@emotion/styled";

export const Main = styled.div `
    display: grid;
    grid-template-columns: 30% 70%; /* Two columns, each 50% */
    grid-template-rows: auto auto; /* Two rows */
    gap: 10px; /* Adjust the gap between grid items if needed */
    width: 80vw; /* Full width of the page */
    padding: 60px;
    border: 1px solid salmon;
`
