import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const alert = await prisma.alert.findUnique({ where: { id: id } })

  if (!alert || alert.userId !== session.user.id) {
    return NextResponse.json({ error: 'Alerta não encontrado' }, { status: 404 })
  }

  await prisma.alert.update({ where: { id: id }, data: { active: false } })

  return NextResponse.json({ success: true })
}
