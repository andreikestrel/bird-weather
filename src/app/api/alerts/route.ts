import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

const createSchema = z.object({
  city: z.string().min(1).max(100),
  lat: z.number(),
  lon: z.number(),
  condition: z.enum(['temp_above', 'temp_below', 'rain', 'wind']),
  threshold: z.number().optional(),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const alerts = await prisma.alert.findMany({
    where: { userId: session.user.id, active: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(alerts)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const body: unknown = await request.json()
  const parsed = createSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', details: parsed.error.flatten() }, { status: 400 })
  }

  const alert = await prisma.alert.create({
    data: {
      userId: session.user.id,
      ...parsed.data,
    },
  })

  return NextResponse.json(alert, { status: 201 })
}
