import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCurrentWeather } from '@/services/weather.service'

const schema = z.object({ city: z.string().min(1).max(100) })

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const parsed = schema.safeParse({ city: searchParams.get('city') })

  if (!parsed.success) {
    return NextResponse.json({ error: 'Parâmetro city inválido' }, { status: 400 })
  }

  try {
    const data = await getCurrentWeather(parsed.data.city)
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno'
    const status = message === 'Cidade não encontrada' ? 404 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
