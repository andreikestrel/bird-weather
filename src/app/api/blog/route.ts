import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

const createSchema = z.object({
  title: z.string().min(1).max(200),
  subtitle: z.string().max(300).optional(),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  coverImage: z.string().url().optional(),
  tags: z.string().default(''),
  published: z.boolean().default(false),
})

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      publishedAt: true,
      author: { select: { name: true } },
    },
  })
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const body: unknown = await request.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', details: parsed.error.flatten() }, { status: 400 })
  }

  const { title, published, ...rest } = parsed.data
  let slug = slugify(title)

  const existing = await prisma.blogPost.findUnique({ where: { slug } })
  if (existing) slug = `${slug}-${Date.now()}`

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug,
      published,
      publishedAt: published ? new Date() : null,
      authorId: session.user.id,
      ...rest,
    },
  })

  return NextResponse.json(post, { status: 201 })
}
