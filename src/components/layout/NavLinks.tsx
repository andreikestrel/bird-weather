'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/', label: 'Início' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'Institucional' },
]

interface NavLinksProps {
  isAuthenticated: boolean
  userImage?: string | null
  userName?: string | null
}

export default function NavLinks({ isAuthenticated, userImage, userName }: NavLinksProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLink = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      onClick={() => setMobileOpen(false)}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary dark:hover:text-white',
        pathname === href
          ? 'text-slate-900 dark:text-white'
          : 'text-slate-500 dark:text-white/70'
      )}
    >
      {label}
    </Link>
  )

  const authLinkClass = 'text-sm font-medium text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors'

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-6">
        {links.map((l) => navLink(l.href, l.label))}
        <div className="flex items-center gap-3 ml-2 pl-2 border-l border-slate-200 dark:border-white/20">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {userImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={userImage} alt={userName ?? ''} className="w-7 h-7 rounded-full" />
              )}
              <Link href="/dashboard" className={authLinkClass}>Dashboard</Link>
              <Link href="/admin/blog" className={authLinkClass}>CMS</Link>
            </div>
          ) : (
            <Link href="/login" className={authLinkClass}>Entrar</Link>
          )}
        </div>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white p-1"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 glass-dark rounded-b-2xl p-4 flex flex-col gap-4 md:hidden animate-slide-up">
          {links.map((l) => navLink(l.href, l.label))}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={authLinkClass}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className={authLinkClass}
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}
