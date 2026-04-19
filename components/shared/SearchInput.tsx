"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  // 1. State hanya digunakan untuk menampung input yang sedang diketik (buffering)
  const [query, setQuery] = useState(initialQuery);

  // 2. Debounce Effect: Hanya untuk mengirim state ke URL
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query !== (searchParams.get("query") || "")) {
        const newUrl = query 
          ? formUrlQuery({ params: searchParams.toString(), key: "query", value: query })
          : removeKeysFromQuery({ params: searchParams.toString(), keysToRemove: ["query"] });
        
        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <div className="flex-1 max-w-2xl mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          // Gunakan key agar jika URL berubah dari luar, state di-reset otomatis
          key={initialQuery} 
          defaultValue={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari Audio..."
          className="pl-10 glass border-border/40 focus:border-primary transition-colors"
        />
      </div>
    </div>
  );
}