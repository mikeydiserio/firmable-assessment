import { useParams } from 'next/navigation'
import { useGetEntity } from '../../hooks/useGetEntity'

export default function EntityPage() {
  const params = useParams()
  const abn = typeof params.abn === 'string' ? params.abn : null
  const { entity, isLoading, error } = useGetEntity(abn)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!entity) return <div>Entity not found</div>

  return (
    <div className="entity-detail">
      <h1>{entity.legal_name}</h1>
      <div className="entity-info">
        <p>
          <strong>ABN:</strong> {entity.abn}
        </p>
        <p>
          <strong>Status:</strong> {entity.abn_status}
        </p>
        <p>
          <strong>Entity Type:</strong> {entity.entity_type_code}
        </p>
        <p>
          <strong>Location:</strong> {entity.state}, {entity.postcode}
        </p>
        <p>
          <strong>Last Updated:</strong> {entity.last_updated}
        </p>
      </div>

      {/* Add more sections for business names and DGR funds */}
    </div>
  )
}
