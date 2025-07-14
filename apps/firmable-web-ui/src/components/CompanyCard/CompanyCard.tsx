import { Company } from '../../types/types'
import { formatABN, getEmployeeSize } from '../../utils/helpers'
import * as S from './CompanyCard.styles'

export interface CompanyCardProps {
  company: Company
  onViewDetails: (companyId: number) => void
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onViewDetails,
}) => {
  return (
    <S.CompanyCardStyles onClick={() => onViewDetails(company.id)}>
      <S.CompanyName>{company.name}</S.CompanyName>
      <S.CompanyDetail>
        <S.DetailLabel>Industry:</S.DetailLabel>
        <S.DetailValue>
          {company.industry} ({company.industryCode})
        </S.DetailValue>
      </S.CompanyDetail>
      <S.CompanyDetail>
        <S.DetailLabel>ABN:</S.DetailLabel>
        <S.DetailValue>{formatABN(company.abn)}</S.DetailValue>
      </S.CompanyDetail>
      <S.CompanyDetail>
        <S.DetailLabel>Employees:</S.DetailLabel>
        <S.DetailValue>
          {company.employeeCount} ({getEmployeeSize(company.employeeCount)})
        </S.DetailValue>
      </S.CompanyDetail>
      <S.CompanyDetail>
        <S.DetailLabel>Revenue:</S.DetailLabel>
        <S.DetailValue>${company.revenueBand}</S.DetailValue>
      </S.CompanyDetail>
      <S.CompanyDetail>
        <S.DetailLabel>Location:</S.DetailLabel>
        <S.DetailValue>
          {company.address.suburb}, {company.address.state}{' '}
          {company.address.postcode}
        </S.DetailValue>
      </S.CompanyDetail>
      {/* <S.CTAContainer>
        <S.ViewDetailsButton
          onClick={() => {
            onViewDetails(company.id);
          }}
          className="bg-indigo-600 text-white py-1 px-3 rounded-md text-sm hover:bg-indigo-700 transition"
        >
          View Details
        </S.ViewDetailsButton>
      </S.CTAContainer> */}
    </S.CompanyCardStyles>
  )
}

export default CompanyCard
