'use client'

import { useEffect, useState } from 'react'
import type { Entity } from '../types/types'
async function getEntityData() {
  // NOTE: In a client-side only environment like this preview, process.env is not available.
  // Replace these with your actual Supabase credentials.
  const supabaseUrl = 'https://<YOUR_PROJECT_REF>.supabase.co'
  const supabaseKey = '<YOUR_ANON_KEY>'

  if (!supabaseUrl.includes('<') && !supabaseKey.includes('<')) {
    // The query that includes business_names.
    const selectQuery =
      '*,business_names(*),dgr_funds(*),entity_types(*),locations(*)'
    const fullUrl = `${supabaseUrl}/rest/v1/entities?select=${selectQuery}`

    try {
      const response = await fetch(fullUrl, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Failed to fetch data from Supabase:', errorText)
        throw new Error(`Failed to fetch data. Status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('An error occurred during the fetch operation:', error)
      throw error // Re-throw the error to be caught by the calling function
    }
  } else {
    console.warn(
      'Supabase URL and Key are not set. Please replace the placeholder values.',
    )
    return []
  }
}

export default function HomePage() {
  const [entities, setEntities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await getEntityData()
        setEntities(data)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred')
        setEntities([])
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, []) // The empty dependency array ensures this effect runs only once on mount.

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <main>
        <header>
          <h1>Entity Data Explorer</h1>
          <p>
            Fetched from Supabase using a single, optimized network request.
          </p>
        </header>

        {entities && entities.length > 0 ? (
          <div>
            {entities.map((entity: Entity) => (
              <div key={entity.abn}>
                <div>
                  <div>
                    <h2>{entity.legal_name}</h2>
                    <p>ABN: {entity.abn}</p>
                  </div>
                  <span>{entity.abn_status}</span>
                </div>

                <div>
                  <p>
                    <strong>GST Status:</strong> {entity.gst_status}
                  </p>
                  {entity.entity_types && (
                    <p>
                      <strong>Entity Type:</strong>{' '}
                      {entity.entity_types.description}
                    </p>
                  )}
                  {entity.locations && (
                    <p>
                      <strong>Location:</strong> {entity.locations.state},{' '}
                      {entity.locations.postcode}
                    </p>
                  )}
                  <p>
                    <strong>Last Updated:</strong>{' '}
                    {new Date(entity.last_updated).toLocaleDateString()}
                  </p>
                </div>

                {/* Render Business Names */}
                {entity.business_names && entity.business_names.length > 0 && (
                  <div>
                    <h5>Business Names:</h5>
                    <ul>
                      {entity.business_names.map(bn => (
                        <li key={bn.id}>
                          {bn.name} ({bn.type})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Render DGR Funds */}
                {entity.dgr_funds && entity.dgr_funds.length > 0 && (
                  <div>
                    <h5>DGR Funds:</h5>
                    <ul>
                      {entity.dgr_funds.map(fund => (
                        <li key={fund.id}>{fund.fund_name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>No data found or failed to load.</p>
            <p>
              Please check your Supabase connection and ensure the tables
              contain data.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
