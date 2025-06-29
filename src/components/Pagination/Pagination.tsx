import React from "react"
import * as S from "./Pagination.styles"

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  if (totalPages <= 1) {
    return null // No pagination needed if there's only one page
  }

  return (
    <S.PaginationContainer>
      {currentPage !== 1 && totalPages !== 1 && <S.PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </S.PaginationButton>}
      {pageNumbers?.length > 0 &&
        pageNumbers.map((number) => (
          <S.PaginationButton
            key={number}
            onClick={() => onPageChange(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </S.PaginationButton>
        ))}
      <S.PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </S.PaginationButton>
    </S.PaginationContainer>
  )
}

export default Pagination
