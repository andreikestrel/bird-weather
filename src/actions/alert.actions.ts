'use server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function deleteAlert(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Não autorizado')

  const alert = await prisma.alert.findUnique({ where: { id } })
  if (!alert || alert.userId !== session.user.id) throw new Error('Alerta não encontrado')

  await prisma.alert.update({ where: { id }, data: { active: false } })
  revalidatePath('/dashboard')
}
