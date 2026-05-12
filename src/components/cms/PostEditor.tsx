'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload, Eye, EyeOff, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import RichTextEditor from './RichTextEditor'

interface PostData {
  id?: string
  title: string
  subtitle: string
  excerpt: string
  content: string
  coverImage: string
  tags: string
  published: boolean
}

interface PostEditorProps {
  initialData?: PostData
}

const defaultData: PostData = {
  title: '',
  subtitle: '',
  excerpt: '',
  content: '',
  coverImage: '',
  tags: '',
  published: false,
}

export default function PostEditor({ initialData }: PostEditorProps) {
  const [data, setData] = useState<PostData>(initialData ?? defaultData)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function update(field: keyof PostData, value: string | boolean) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  async function uploadImage(file: File) {
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      if (!res.ok) throw new Error('Erro no upload')
      const { url } = await res.json() as { url: string }
      update('coverImage', url)
    } catch {
      setError('Erro ao fazer upload da imagem')
    } finally {
      setUploading(false)
    }
  }

  async function handleSave(publish?: boolean) {
    setSaving(true)
    setError(null)

    const payload = {
      ...data,
      published: publish !== undefined ? publish : data.published,
    }

    try {
      const isEdit = !!data.id
      const url = isEdit ? `/api/blog/${data.id}` : '/api/blog'
      const method = isEdit ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const json = await res.json() as { error?: string }
        throw new Error(json.error ?? 'Erro ao salvar')
      }

      router.push('/admin/blog')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="glass rounded-xl p-3 border border-red-400/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Cover image */}
      <div className="glass-card p-5 space-y-3">
        <label className="text-white/70 text-sm font-medium">Imagem de capa</label>
        {data.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.coverImage} alt="Capa" className="w-full h-48 object-cover rounded-xl" />
        )}
        <div className="flex gap-3">
          <Input
            placeholder="URL da imagem"
            value={data.coverImage}
            onChange={(e) => update('coverImage', e.target.value)}
          />
          <Button
            type="button"
            variant="glass"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            title="Upload de imagem"
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
          />
        </div>
      </div>

      {/* Title & subtitle */}
      <div className="glass-card p-5 space-y-3">
        <div>
          <label className="text-white/70 text-sm font-medium block mb-1.5">Título *</label>
          <Input
            placeholder="Título do post"
            value={data.title}
            onChange={(e) => update('title', e.target.value)}
            className="text-lg font-semibold"
          />
        </div>
        <div>
          <label className="text-white/70 text-sm font-medium block mb-1.5">Subtítulo</label>
          <Input
            placeholder="Subtítulo opcional"
            value={data.subtitle}
            onChange={(e) => update('subtitle', e.target.value)}
          />
        </div>
        <div>
          <label className="text-white/70 text-sm font-medium block mb-1.5">Resumo *</label>
          <textarea
            placeholder="Resumo para aparecer nos cards do blog..."
            value={data.excerpt}
            onChange={(e) => update('excerpt', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
        <div>
          <label className="text-white/70 text-sm font-medium block mb-1.5">Tags (separadas por vírgula)</label>
          <Input
            placeholder="meteorologia, clima, tecnologia"
            value={data.tags}
            onChange={(e) => update('tags', e.target.value)}
          />
        </div>
      </div>

      {/* Rich text editor */}
      <div className="space-y-1.5">
        <label className="text-white/70 text-sm font-medium block">Conteúdo *</label>
        <RichTextEditor
          content={data.content}
          onChange={(html) => update('content', html)}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          onClick={() => handleSave(false)}
          variant="glass"
          disabled={saving || !data.title}
          className="gap-2"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Salvar rascunho
        </Button>
        <Button
          onClick={() => handleSave(true)}
          disabled={saving || !data.title || !data.excerpt || !data.content}
          className="gap-2"
        >
          {data.published ? (
            <>
              <Eye size={16} /> Atualizar publicação
            </>
          ) : (
            <>
              <EyeOff size={16} /> Publicar
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
