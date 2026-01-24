"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Ambil nilai query dari URL saat ini
  const urlQuery = searchParams.get("query") || "";
  
  // Sinkronisasi state dengan URL (hanya saat URL berubah)
  const [query, setQuery] = useState(urlQuery);

  // Update state jika URL berubah (misal: back/forward button)
  useEffect(() => {
    const current = searchParams.get("query") || "";
    if (current !== query) {
      setQuery(current);
    }
  }, [searchParams, query]);

  // Debounced update URL berdasarkan input
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentUrlQuery = searchParams.get("query") || "";
      
      // Hanya push jika berbeda dari URL saat ini
      if (query !== currentUrlQuery) {
        let newUrl;
        if (query) {
          newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "query",
            value: query,
          });
        } else {
          newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });
        }
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, searchParams, router]);

  return (
    <div className="flex-1 max-w-2xl mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari Audio..."
          className="pl-10 glass border-border/40 focus:border-primary transition-colors"
        />
      </div>
    </div>
  );
}