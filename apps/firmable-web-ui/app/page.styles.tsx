import styled from "styled-components";

export const Main = styled.div`
  display: grid;
  grid-template-columns: 20% 80%; /* Two columns, each 50% */
  grid-template-rows: auto auto; /* Two rows */
  gap: 10px; /* Adjust the gap between grid items if needed */
  width: 80vw; /* Full width of the page */
  padding: 60px;
  border: 1px solid salmon;

  /* Enable hover only on non-touch devices */
  @media (hover: hover) and (pointer: fine) {
    a.primary:hover {
      background: var(--button-primary-hover);
      border-color: transparent;
    }

    a.secondary:hover {
      background: var(--button-secondary-hover);
      border-color: transparent;
    }

    .footer a:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }

  @media (max-width: 600px) {
    .page {
      padding: 32px;
      padding-bottom: 80px;
    }

    .main {
      align-items: center;
    }

    .main ol {
      text-align: center;
    }

    .ctas {
      flex-direction: column;
    }

    .ctas a {
      font-size: 14px;
      height: 40px;
      padding: 0 16px;
    }

    a.secondary {
      min-width: auto;
    }
  }
`;

export const Page = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const CTAContainer = styled.div`
  border-radius: 128px;
  height: 48px;
  padding: 0 20px;
  border: none;
  border: 1px solid transparent;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
`;
