import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import type { AppProps } from "next/app";
import Nav from '@/components/nav';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bird Weather',
  description: 'Saiba o clima da sua cidade agora mesmo!',
}

export default function App({ Component, pageProps }: AppProps) {
    return (
      <>
        <Nav />        
        <Component {...pageProps} />
      </>
    );
  }
