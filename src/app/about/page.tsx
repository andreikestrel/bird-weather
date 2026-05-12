import type { Metadata } from 'next'
import { Cloud, Search, Bell, BookOpen, Github, Linkedin, MapPin, Thermometer, Wind } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Institucional',
  description: 'Conheça o Bird Weather — clima em tempo real para qualquer cidade do mundo.',
}

const features = [
  {
    icon: Search,
    title: 'Busca inteligente',
    description: 'Digite o nome de qualquer cidade do mundo e veja sugestões em tempo real. Simples, rápido e sem erros.',
  },
  {
    icon: Thermometer,
    title: 'Dados precisos',
    description: 'Temperatura atual, sensação térmica, mínima e máxima do dia — tudo atualizado a cada consulta.',
  },
  {
    icon: Wind,
    title: 'Condições completas',
    description: 'Umidade, vento, pressão atmosférica e visibilidade num único painel, fácil de ler.',
  },
  {
    icon: MapPin,
    title: 'Previsão para 5 dias',
    description: 'Planeje sua semana com a previsão completa — saiba o que esperar antes de sair de casa.',
  },
  {
    icon: Bell,
    title: 'Alertas personalizados',
    description: 'Defina limites de temperatura, chuva ou vento e receba uma notificação diretamente no navegador quando a condição for atingida.',
  },
  {
    icon: BookOpen,
    title: 'Blog sobre clima',
    description: 'Curiosidades e explicações sobre fenômenos meteorológicos — para quem quer entender o tempo além do termômetro.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 relative z-10">
      <div className="max-w-screen-lg mx-auto space-y-20">

        {/* Hero */}
        <section className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <Cloud size={40} className="text-primary-light" />
            <span className="font-heading font-bold text-4xl sm:text-5xl text-slate-800 dark:text-white">Bird Weather</span>
          </div>
          <p className="text-slate-600 dark:text-white/70 text-xl leading-relaxed">
            Clima em tempo real para qualquer cidade do mundo — bonito, rápido e feito para o dia a dia.
          </p>
        </section>

        {/* Missão */}
        <section className="glass-card p-8 sm:p-10 max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-bold text-slate-800 dark:text-white text-2xl mb-4">Por que o Bird Weather?</h2>
          <p className="text-slate-600 dark:text-white/70 leading-relaxed mb-4">
            A maioria dos apps de clima é lenta, cheia de anúncios ou difícil de usar. O Bird Weather nasceu
            para ser o oposto: limpo, direto e bonito. Você abre, digita a cidade e já tem o que precisa.
          </p>
          <p className="text-slate-600 dark:text-white/70 leading-relaxed">
            Para quem viaja, trabalha ao ar livre ou simplesmente quer saber se vai chover amanhã —
            o Bird Weather entrega a informação certa, na hora certa.
          </p>
        </section>

        {/* Features */}
        <section>
          <h2 className="font-heading font-bold text-slate-800 dark:text-white text-3xl mb-2 text-center">Tudo que você precisa</h2>
          <p className="text-slate-500 dark:text-white/50 text-center mb-10">Simples no uso, completo na informação.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="glass rounded-2xl p-6 border border-slate-200 dark:border-white/20 hover:border-primary/40 dark:hover:border-white/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary dark:text-primary-light" />
                </div>
                <h3 className="font-heading font-semibold text-slate-800 dark:text-white text-lg mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-white/60 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Autor */}
        <section className="text-center max-w-md mx-auto">
          <div className="glass-card p-8">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="font-heading font-bold text-2xl text-primary dark:text-primary-light">A</span>
            </div>
            <h2 className="font-heading font-bold text-slate-800 dark:text-white text-xl mb-1">Andrei Barbosa</h2>
            <p className="text-slate-500 dark:text-white/50 text-sm mb-5">Desenvolvedor — apaixonado por produtos que realmente funcionam</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/andreikestrel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/barbosaandrei/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
