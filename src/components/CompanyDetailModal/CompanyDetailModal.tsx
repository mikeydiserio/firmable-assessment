import { Company } from '../../types/types';
import { formatABN, getEmployeeSize } from '../../utils/helpers';
import * as S from './CompanyDetailModal.styles';

export interface CompanyDetailModalProps {
  company: Company | null;
  onClose: () => void;
}


const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({ company, onClose }) => {
  if (!company) {
    return null;
  }

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseModalButton onClick={onClose}>
          &times;
        </S.CloseModalButton>
        <h2 className="text-2xl font-bold mb-4">{company.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Company Details</h3>
            <div className="company-detail">
              <span className="detail-label">ABN:</span>
              <span>{formatABN(company.abn)}</span>
            </div>
            <div className="company-detail">
              <span className="detail-label">ACN:</span>
              <span>{company.acn}</span>
            </div>
            <div className="company-detail">
              <span className="detail-label">Industry:</span>
              <span>
                {company.industry} ({company.industryCode})
              </span>
            </div>
            <div className="company-detail">
              <span className="detail-label">Employees:</span>
              <span>
                {company.employeeCount} ({getEmployeeSize(company.employeeCount)})
              </span>
            </div>
            <div className="company-detail">
              <span className="detail-label">Revenue:</span>
              <span>${company.revenueBand}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <div className="company-detail">
              <span className="detail-label">Website:</span>
              <span>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {company.website}
                </a>
              </span>
            </div>
            <div className="company-detail">
              <span className="detail-label">Email Domain:</span>
              <span>{company.emailDomain}</span>
            </div>
            <div className="company-detail">
              <span className="detail-label">Phone:</span>
              <span>{company.phone}</span>
            </div>

            <h3 className="text-lg font-semibold mb-2 mt-4">Address</h3>
            <div className="company-detail">
              <span className="detail-label">Street:</span>
              <span>{company.address.street}</span>
            </div>
            <div className="company-detail">
              <span className="detail-label">Suburb:</span>
              <span>{company.address.suburb}</span>
            </div>
            <div className="company-detail">
              <span className="detail-label">State:</span>
              <span>{company.address.state}</span>
            </div>
            <div className="company-detail">
              <span className="detail-label">Postcode:</span>
              <span>{company.address.postcode}</span>
            </div>
          </div>
        </div>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default CompanyDetailModal;