import Link from 'next/link'
import { Calendar, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Post } from '@/models/blog.types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="glass rounded-2xl p-6 border border-slate-200 dark:border-white/20 hover:border-primary/40 dark:hover:border-white/40 hover:bg-slate-50 dark:hover:bg-white/15 transition-all duration-300 h-full">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
        <h2 className="font-heading font-bold text-slate-800 dark:text-white text-xl mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-slate-500 dark:text-white/60 dark:group-hover:text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 transition-colors">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-white/40 dark:group-hover:text-slate-500 transition-colors">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={12} />
            {post.author}
          </span>
        </div>
      </article>
    </Link>
  )
}
