import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getForecast } from '@/services/weather.service'

const schema = z.object({ city: z.string().min(1).max(100) })

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const parsed = schema.safeParse({ city: searchParams.get('city') })

  if (!parsed.success) {
    return NextResponse.json({ error: 'Parâmetro city inválido' }, { status: 400 })
  }

  try {
    const data = await getForecast(parsed.data.city)
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
