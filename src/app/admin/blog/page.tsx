import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { PenSquare, Eye, EyeOff, Plus } from 'lucide-react'

export const metadata: Metadata = { title: 'CMS — Blog' }

export default async function AdminBlogPage() {
  const session = await auth().catch(() => null)
  if (!session?.user?.id) redirect('/login')

  const posts = await prisma.blogPost.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, published: true, publishedAt: true, createdAt: true },
  })

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl text-white">CMS — Blog</h1>
            <p className="text-white/50 text-sm mt-1">Gerencie os posts do seu blog</p>
          </div>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-primary/30"
          >
            <Plus size={16} />
            Novo post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <PenSquare size={32} className="mx-auto mb-3 text-white/30" />
            <p className="text-white/50 mb-4">Nenhum post criado ainda.</p>
            <Link
              href="/admin/blog/new"
              className="text-primary-light hover:text-white text-sm transition-colors"
            >
              Criar o primeiro post →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="glass rounded-xl p-4 border border-white/20 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white font-medium truncate">{post.title}</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {post.published && post.publishedAt
                      ? `Publicado em ${new Date(post.publishedAt).toLocaleDateString('pt-BR')}`
                      : 'Rascunho'}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {post.published ? (
                    <Eye size={15} className="text-accent" />
                  ) : (
                    <EyeOff size={15} className="text-white/30" />
                  )}
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="text-xs text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40"
                  >
                    Editar
                  </Link>
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-xs text-primary-light hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-primary/30 hover:border-primary"
                    >
                      Ver
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
