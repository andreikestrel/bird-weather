import Link from 'next/link'
import { Cloud } from 'lucide-react'
import { auth } from '@/lib/auth'
import NavLinks from './NavLinks'

export default async function Nav() {
  let session = null
  try {
    session = await auth()
  } catch {
    // auth não configurada ainda — continua sem sessão
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-slate-800 dark:text-white">
            <Cloud size={24} className="text-primary-light" />
            <span className="font-heading font-bold text-lg tracking-tight">Bird Weather</span>
          </Link>
          <NavLinks
            isAuthenticated={!!session?.user}
            userImage={session?.user?.image}
            userName={session?.user?.name}
          />
        </div>
      </nav>
    </header>
  )
}
