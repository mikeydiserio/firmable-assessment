import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ abn: string }> },
) {
  const { abn } = await params

  if (!abn) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 },
    )
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_KEY
  ) {
    return NextResponse.json(
      { error: 'Missing Supabase configuration' },
      { status: 500 },
    )
  }

  return NextResponse.json({})
}
