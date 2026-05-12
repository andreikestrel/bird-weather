'use client'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'bw-city-history'
const MAX_ENTRIES = 5

export interface CityHistoryEntry {
  city: string
  label: string
}

function readStorage(): CityHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CityHistoryEntry[]) : []
  } catch {
    return []
  }
}

function writeStorage(entries: CityHistoryEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // ignore
  }
}

export function useCityHistory() {
  const [history, setHistory] = useState<CityHistoryEntry[]>([])

  useEffect(() => {
    setHistory(readStorage())
  }, [])

  const addCity = useCallback((city: string, label: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((e) => e.city !== city)
      const next = [{ city, label }, ...filtered].slice(0, MAX_ENTRIES)
      writeStorage(next)
      return next
    })
  }, [])

  const removeCity = useCallback((city: string) => {
    setHistory((prev) => {
      const next = prev.filter((e) => e.city !== city)
      writeStorage(next)
      return next
    })
  }, [])

  return { history, addCity, removeCity }
}
