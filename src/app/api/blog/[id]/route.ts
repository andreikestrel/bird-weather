import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  subtitle: z.string().max(300).optional(),
  excerpt: z.string().min(1).max(500).optional(),
  content: z.string().min(1).optional(),
  coverImage: z.string().url().nullable().optional(),
  tags: z.string().optional(),
  published: z.boolean().optional(),
})

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id }, include: { author: { select: { name: true, image: true } } } })
  if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post || post.authorId !== session.user.id) {
    return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 })
  }

  const body: unknown = await request.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  const { published, ...rest } = parsed.data
  const updated = await prisma.blogPost.update({
    where: { id },
    data: {
      ...rest,
      ...(published !== undefined && {
        published,
        publishedAt: published && !post.publishedAt ? new Date() : post.publishedAt,
      }),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post || post.authorId !== session.user.id) {
    return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 })
  }

  await prisma.blogPost.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
