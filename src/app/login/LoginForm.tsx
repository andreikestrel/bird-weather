'use client'

import { useState, type FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Usuário ou senha inválidos')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div>
        <label htmlFor="username" className="text-white/70 text-xs font-medium mb-1 block">
          Usuário
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-11 rounded-xl bg-white/10 border border-white/20 px-4 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-primary-light"
          placeholder="adminBird"
          autoComplete="username"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="text-white/70 text-xs font-medium mb-1 block">
          Senha
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 rounded-xl bg-white/10 border border-white/20 px-4 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-primary-light"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-60 mt-2"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
