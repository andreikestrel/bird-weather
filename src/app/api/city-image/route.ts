import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCityImage } from '@/services/city-image.service'

const schema = z.object({ city: z.string().min(1).max(100) })

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const parsed = schema.safeParse({ city: searchParams.get('city') })

  if (!parsed.success) {
    return NextResponse.json({ error: 'Parâmetro city inválido' }, { status: 400 })
  }

  try {
    const url = await getCityImage(parsed.data.city)
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ url: null })
  }
}
