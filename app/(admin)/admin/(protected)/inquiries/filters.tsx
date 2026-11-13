"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useTransition, useEffect, useRef } from "react"
import { Search, X, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function InquiriesFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [q, setQ] = useState(searchParams.get("q") || "")
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    setQ(searchParams.get("q") || "")
  }, [searchParams])

  const applySearch = (value: string) => {
    const params = new URLSearchParams()
    if (value) params.set("q", value)
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  useEffect(() => {
    if (q === (searchParams.get("q") || "")) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => applySearch(q), 400)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const handleApplyNow = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    applySearch(q)
  }

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    setQ("")
    startTransition(() => router.push(pathname))
  }

  const hasSearch = !!searchParams.get("q")

  return (
    <div className="flex items-center gap-2 rounded-xl border bg-white p-4 shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or email..."
          className="h-10 pr-24 pl-9"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleApplyNow()
            }
          }}
        />
        {q && q !== (searchParams.get("q") || "") && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleApplyNow}
            className="absolute top-1.5 right-2 h-7 px-2 text-xs"
          >
            <Check className="mr-1 h-3 w-3" /> Apply
          </Button>
        )}
      </div>
      {hasSearch && (
        <Button variant="ghost" onClick={handleClear} disabled={isPending}>
          <X className="mr-2 h-4 w-4" /> Clear
        </Button>
      )}
    </div>
  )
}
