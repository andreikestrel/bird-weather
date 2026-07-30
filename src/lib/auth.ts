import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db'

const ADMIN_USERNAME = 'adminBird'
const ADMIN_PASSWORD = '123456'
const ADMIN_EMAIL = 'admin@birdweather.local'

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Usuário', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.username !== ADMIN_USERNAME || credentials?.password !== ADMIN_PASSWORD) {
          return null
        }
        const user = await prisma.user.upsert({
          where: { email: ADMIN_EMAIL },
          update: {},
          create: { email: ADMIN_EMAIL, name: ADMIN_USERNAME },
        })
        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & import('next-auth').DefaultSession['user']
  }
}
