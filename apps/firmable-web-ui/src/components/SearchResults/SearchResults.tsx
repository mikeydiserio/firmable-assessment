// This component is designed to be a Server Component in a Next.js 15 App Router.

// --- Instructions for Setup ---
// 1. Create a file named `.env.local` in the root of your project.
// 2. Add your Supabase credentials to this file. It's crucial for security.
//
//    NEXT_PUBLIC_SUPABASE_URL="https://<YOUR_PROJECT_REF>.supabase.co"
//    NEXT_PUBLIC_SUPABASE_ANON_KEY="<YOUR_ANON_KEY>"
//

import React, { useEffect, useState } from 'react'
import { Entity } from '../../types/types'

// This async function fetches the data on the server before rendering the page.
async function getEntityData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables are not set.')
    throw new Error(
      'Supabase environment variables must be configured in .env.local',
    )
  }

  // Reverted to the query that includes business_names.
  const selectQuery =
    '*,business_names(*),dgr_funds(*),entity_types(*),locations(*)'
  const fullUrl = `${supabaseUrl}/rest/v1/entities?select=${selectQuery}`

  try {
    const response = await fetch(fullUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      // Cache the data for 1 hour. Adjust as needed.
      next: { revalidate: 3600 },
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
    return []
  }
}

export default function SearchResults() {
  //   const entities = await getEntityData()
  //   return (
  //     <div>
  //       <main>
  //         <header>
  //           <h1>Entity Data Explorer</h1>
  //           <p>
  //             Fetched from Supabase using a single, optimized network request.
  //           </p>
  //         </header>

  //         {entities && entities.length > 0 ? (
  //           <div>
  //             {entities.map((entity:) => (
  //               <div key={entity.abn}>
  //                 <div>
  //                   <div>
  //                     <h2>{entity.legal_name}</h2>
  //                     <p>ABN: {entity.abn}</p>
  //                   </div>
  //                   <span>{entity.abn_status}</span>
  //                 </div>

  //                 <div>
  //                   <p>
  //                     <strong>GST Status:</strong> {entity.gst_status}
  //                   </p>
  //                   {entity.entity_types && (
  //                     <p>
  //                       <strong>Entity Type:</strong>{' '}
  //                       {entity.entity_types.description}
  //                     </p>
  //                   )}
  //                   {entity.locations && (
  //                     <p>
  //                       <strong>Location:</strong> {entity.locations.state},{' '}
  //                       {entity.locations.postcode}
  //                     </p>
  //                   )}
  //                   <p>
  //                     <strong>Last Updated:</strong>{' '}
  //                     {new Date(entity.last_updated).toLocaleDateString()}
  //                   </p>
  //                 </div>

  //                 {/* Render Business Names */}
  //                 {entity.business_names && entity.business_names.length > 0 && (
  //                   <div>
  //                     <h5>Business Names:</h5>
  //                     <ul>
  //                       {entity.business_names.map(bn => {
  //                         return (
  //                         <li key={bn.id}>
  //                           {bn.name} ({bn.type})
  //                         </li>)}
  //                       </ul>
  //                     </div>
  //                 )}

  //                 {/* Render DGR Funds */}
  //                 {entity.dgr_funds && entity.dgr_funds.length > 0 && (
  //                   <div>
  //                     <h5>DGR Funds:</h5>
  //                     <ul>
  //                       {entity.dgr_funds.map((fund: any) => {
  //                         return <li key={fund.id}>{fund.fund_name}</li>
  //                       )}
  //                     </ul>
  //                   </div>
  //                 )}
  //               </div>
  //             ))}
  //           </div>
  //         ) : (
  //           <div>
  //             <p>No data found or failed to load.</p>
  //             <p>
  //               Please check your Supabase connection and ensure the tables
  //               contain data.
  //             </p>
  //           </div>
  //         )}
  //       </main>
  //     </div>
  //   )
  // }

  // The main page component, refactored to work on the client-side.
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setEntities([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, []) // The empty dependency array ensures this effect runs only once on mount.

  if (loading) {
    return <React.Fragment>Loading...</React.Fragment>
  }

  if (error) {
    return <React.Fragment>Error: {error}</React.Fragment>
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
                  {/* {entity.entity_types && (
                    <p>
                      <strong>Entity Type:</strong>{' '}
                      {entity.entity_types.description}
                    </p>
                  )} */}
                  {entity.location_id && (
                    <p>
                      <strong>Location:</strong> {entity.state},{' '}
                      {entity.postcode}
                    </p>
                  )}
                  <p>
                    <strong>Last Updated:</strong>{' '}
                    {/* {new Date(entity.last_updated).toLocaleDateString()} */}
                  </p>
                </div>

                {/* Render Business Names */}
                {/* {entity.business_names && entity.business_names.length > 0 && (
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
                )} */}

                {/* Render DGR Funds */}
                {/* {entity.dgr_funds && entity.dgr_funds.length > 0 && (
                  <div>
                    <h5>DGR Funds:</h5>
                    <ul>
                      {entity.dgr_funds.map(fund => (
                        <li key={fund.id}>{fund.fund_name}</li>
                      ))}
                    </ul>
                  </div>
                )} */}
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
