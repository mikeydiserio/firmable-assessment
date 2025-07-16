import { Entity } from '../../types/types'
import * as S from './EntityCard.styles'

export interface EntityCardProps {
  entity: Entity
  onViewDetails: (abn: string) => void
}

const EntityCard: React.FC<EntityCardProps> = ({ entity, onViewDetails }) => {
  const renderDetail = (
    label: string,
    value: string | number | null | undefined,
  ) => {
    if (value === null || value === undefined || value === '') {
      return null
    }
    return (
      <div key={label}>
        <S.DetailLabel>{label}:</S.DetailLabel>
        <S.DetailValue>{value}</S.DetailValue>
      </div>
    )
  }

  return (
    // The entire card is clickable to view details
    <S.EntityCardStyles onClick={() => onViewDetails(entity.abn)}>
      <S.EntityName>{entity.legal_name || 'N/A'}</S.EntityName>

      {/* Container for all the detail fields */}
      <S.EntityDetail>
        {renderDetail('ABN', entity.abn)}
        {renderDetail('ABN Status', entity.abn_status)}
        {renderDetail('Status From', entity.abn_status_from_date)}
        {renderDetail('Entity Type', entity.entity_type_code)}
        {renderDetail('GST Status', entity.gst_status)}
        {renderDetail('GST Status From', entity.gst_status_from_date)}
        {renderDetail('State', entity.state)}
        {renderDetail('Postcode', entity.postcode)}
        {renderDetail('Last Updated', entity.last_updated)}
        {renderDetail('Location ID', entity.location_id)}
      </S.EntityDetail>

      {/* <S.CTAContainer>
        <S.ViewDetailsButton
          onClick={(e) => {
            e.stopPropagation(); // Prevent card's onClick from firing
            onViewDetails(entity.id);
          }}
          className="bg-indigo-600 text-white py-1 px-3 rounded-md text-sm hover:bg-indigo-700 transition"
        >
          View Details
        </S.ViewDetailsButton>
      </S.CTAContainer> */}
    </S.EntityCardStyles>
  )
}

export default EntityCard
