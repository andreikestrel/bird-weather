interface UnsplashPhoto {
  urls: { regular: string; full: string }
  alt_description: string | null
}

interface UnsplashResponse {
  results: UnsplashPhoto[]
  total: number
}

export async function getCityImage(city: string): Promise<string | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) return null

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}+city&orientation=landscape&per_page=1&order_by=relevant`
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${key}` },
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null

    const data: UnsplashResponse = await res.json()
    return data.results[0]?.urls.regular ?? null
  } catch {
    return null
  }
}
