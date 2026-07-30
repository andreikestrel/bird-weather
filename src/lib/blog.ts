import { prisma } from '@/lib/db'
import type { Post } from '@/models/blog.types'

type PostRecord = {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string | null
  tags: string
  publishedAt: Date | null
  createdAt: Date
  author: { name: string | null }
}

function toPost(post: PostRecord): Post {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    html: post.content,
    date: (post.publishedAt ?? post.createdAt).toISOString(),
    author: post.author.name ?? 'Bird Weather',
    tags: post.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    coverImage: post.coverImage ?? undefined,
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    include: { author: { select: { name: true } } },
  })
  return posts.map(toPost)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  })
  if (!post || !post.published) return null
  return toPost(post)
}
