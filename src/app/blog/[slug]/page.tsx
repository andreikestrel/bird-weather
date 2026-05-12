import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post não encontrado' }
  return { title: post.title, description: post.excerpt }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const date = new Date(post.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 relative z-10">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar ao blog
        </Link>

        <div className="glass-card p-8 sm:p-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-slate-800 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-400 dark:text-white/50 mb-8 pb-8 border-b border-slate-200 dark:border-white/10">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
          </div>

          <div
            className="prose dark:prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-a:text-primary dark:prose-a:text-primary-light prose-code:text-primary dark:prose-code:text-primary-light"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </main>
  )
}
