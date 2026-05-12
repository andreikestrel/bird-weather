import Link from 'next/link'
import { Cloud, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto">
      <div className="glass-dark border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-white mb-3">
                <Cloud size={20} className="text-primary-light" />
                <span className="font-heading font-bold text-lg">Bird Weather</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Clima em tempo real para qualquer cidade do mundo, com alertas personalizados.
              </p>
            </div>
            <div>
              <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider mb-4">
                Serviços
              </h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Alertas Meteorológicos
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Institucional
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider mb-4">
                Contato
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://github.com/andreikestrel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/barbosaandrei/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Andrei Barbosa. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}
