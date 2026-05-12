export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  coverImage?: string
}

export interface Post extends PostFrontmatter {
  slug: string
  content: string
  html: string
}

export interface BlogPostDB {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  tags: string
  coverImage: string | null
  published: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}
