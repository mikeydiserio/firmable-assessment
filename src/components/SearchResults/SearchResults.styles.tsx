import styled from '@emotion/styled';

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
`;