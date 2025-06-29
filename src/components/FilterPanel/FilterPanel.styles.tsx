import styled from '@emotion/styled'

export const Panel = styled.div`
  background-color: var(--light-gray);
  padding: 1.5rem;s
  margin-bottom: 1.5rem;
  width: 100%;
  border-right: 2px solid white;

  @media (max-width: 768px) {
    padding: 1rem;
  }

`

export const FilterSection = styled.div`
    margin-bottom: 1rem;

    
`
export const FilterTitle = styled.h3`
      font-weight: 500;
      margin-bottom: 0.5rem;
`

export const FilterHeading = styled.h2`
      font-weight: 600;
      font-size: 28px;
      margin-bottom: 0.5rem;
`

export const EmployeesNo = styled.div`
      display: flex;
      flex-flow: column nowrap;
`

export const CheckboxItem = styled.div`
      display: flex;
      align-items: center;
      gap: 0.5rem;

      input {
        margin-right: 0.5rem;
      }
`

