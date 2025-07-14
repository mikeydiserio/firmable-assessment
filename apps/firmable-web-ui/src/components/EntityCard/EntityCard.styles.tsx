import styled from 'styled-components'

export const EntityCardStyles = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.2s;
  border: 4px solid transparent;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #ececec;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-bottom: 4px solid var(--primary-color);
  }
`

export const EntityName = styled.h2`
  font-weight: 600;
  font-size: 1.125rem;
  color: #09baf0;
  margin-bottom: 0.5rem;
`

export const EntityDetail = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`

export const DetailLabel = styled.span`
  font-weight: 500;
  min-width: 100px;
  color: #6b7280;
  margin-bottom: 0.25rem;
`

export const DetailValue = styled.span`
  font-weight: 500;
  min-width: 100px;
  color: #020202;
  margin-bottom: 0.25rem;
`

export const CTAContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;
`

export const ViewDetailsButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: 1px solid #7b808e;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  &:hover {
    background-color: #43495a; // Darker shade for hover effect
  }
`
