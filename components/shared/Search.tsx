"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export default function Search() {
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
    <div className="lg:w-1/2 relative z-20 w-60">
      
      <Input
        type="text"
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className="bg-zinc-900 border-none rounded-full lg:w-full px-4 py-6 text-white"
        placeholder="Cari audio..."
      />

      
      <Image
        src="/icons/search.svg"
        width={6}
        height={6}
        alt="icon search"
        className="absolute right-5 top-3 w-6 h-6"
      />
    </div>
  );
}