import { NextResponse } from 'next/server'
import { z } from 'zod'
import { searchCities } from '@/services/geocoding.service'

const schema = z.object({ q: z.string().min(2).max(100) })

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const parsed = schema.safeParse({ q: searchParams.get('q') })

  if (!parsed.success) {
    return NextResponse.json({ error: 'Parâmetro q inválido' }, { status: 400 })
  }

  try {
    const results = await searchCities(parsed.data.q)
    return NextResponse.json(results)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
