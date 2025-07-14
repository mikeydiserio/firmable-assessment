import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Get URL parameters
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const pageSize = parseInt(url.searchParams.get('pageSize') || '50')

  // Validate environment variables
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_KEY
  ) {
    return NextResponse.json(
      { error: 'Missing Supabase configuration' },
      { status: 500 },
    )
  }

  return NextResponse.json({
    data: {},
    pagination: {
      page,
      pageSize,
      // total: count,
      // totalPages: count ? Math.ceil(count / pageSize) : 0,
    },
  })
}
