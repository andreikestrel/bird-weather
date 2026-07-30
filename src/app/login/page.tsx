import type { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Cloud } from 'lucide-react'
import LoginForm from './LoginForm'

export const metadata: Metadata = { title: 'Entrar' }

export default async function LoginPage() {
  const session = await auth().catch(() => null)
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-20 relative z-10">
      <div className="glass-card p-8 sm:p-10 w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Cloud size={28} className="text-primary-light" />
          <span className="font-heading font-bold text-2xl text-white">Bird Weather</span>
        </div>
        <h1 className="font-heading font-bold text-2xl text-white mb-2">Bem-vindo de volta</h1>
        <p className="text-white/60 text-sm mb-8">Entre com seu usuário e senha para continuar</p>

        <LoginForm />
      </div>
    </main>
  )
}
