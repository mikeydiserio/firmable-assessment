import { NextResponse } from 'next/server'

export async function GET(_request: Request) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_KEY
  ) {
    return NextResponse.json(
      { error: 'Missing Supabase configuration' },
      { status: 500 },
    )
  }
  return NextResponse.json(
    { error: 'Missing sopmething else configuration' },
    { status: 500 },
  )
}
