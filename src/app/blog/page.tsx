import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import PostCard from '@/components/blog/PostCard'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = { title: 'Blog' }

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 relative z-10">
      <div className="max-w-screen-lg mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={20} className="text-primary-light" />
            <span className="text-slate-500 dark:text-white/60 text-sm font-medium uppercase tracking-wider">Blog</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-slate-800 dark:text-white mb-3">
            Meteorologia & Clima
          </h1>
          <p className="text-slate-500 dark:text-white/60 text-lg max-w-xl">
            Artigos sobre previsão do tempo, fenômenos climáticos e muito mais.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-slate-400 dark:text-white/50">Nenhum post publicado ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
