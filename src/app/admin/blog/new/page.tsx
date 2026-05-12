import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { ArrowLeft } from 'lucide-react'
import PostEditor from '@/components/cms/PostEditor'

export const metadata: Metadata = { title: 'Novo Post' }

export default async function NewPostPage() {
  const session = await auth().catch(() => null)
  if (!session?.user?.id) redirect('/login')

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar ao CMS
        </Link>
        <h1 className="font-heading font-bold text-3xl text-white mb-6">Novo post</h1>
        <PostEditor />
      </div>
    </main>
  )
}
