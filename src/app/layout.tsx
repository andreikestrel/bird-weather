import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import CityBackground from '@/components/layout/CityBackground'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Bird Weather',
    template: '%s | Bird Weather',
  },
  description: 'Saiba o clima da sua cidade agora mesmo com previsão em tempo real.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable}`}
    >
      <body className="font-sans min-h-screen text-white" suppressHydrationWarning>
        <ThemeProvider>
          <CityBackground />
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
