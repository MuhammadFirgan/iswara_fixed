"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";

export default function SearchInput() {
  const [query, setQuery] = useState(""); 
  const router = useRouter(); 
  const searchParams = useSearchParams(); 

  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

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
    }, 300); 

    return () => clearTimeout(delayDebounceFn); 
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