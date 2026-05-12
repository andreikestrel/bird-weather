import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import type { Post } from '@/models/blog.types'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

async function parsePost(filename: string): Promise<Post> {
  const slug = filename.replace('.mdx', '').replace('.md', '')
  const filepath = path.join(BLOG_DIR, filename)
  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  const html = await marked(content)

  return {
    slug,
    content,
    html,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    author: data.author as string,
    tags: (data.tags as string[]) || [],
    coverImage: data.coverImage as string | undefined,
  }
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
  const posts = await Promise.all(files.map(parsePost))
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  for (const ext of ['.mdx', '.md']) {
    const filepath = path.join(BLOG_DIR, `${slug}${ext}`)
    if (fs.existsSync(filepath)) {
      return parsePost(`${slug}${ext}`)
    }
  }
  return null
}
