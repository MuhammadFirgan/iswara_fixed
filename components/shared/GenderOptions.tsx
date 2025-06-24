'use client'
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllModel } from "@/lib/actions/audio.action";
import { Model } from "@/types";
import { Skeleton } from "../ui/skeleton";

type DropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
  disabled?: boolean;
};



export default function GenderOptions({ value, onChangeHandler, disabled }: DropdownProps) {
  const [models, setModels] = useState<Model[]>([]); 

  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await getAllModel();
        setModels(data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    }
    fetchModels();
  }, []);

  const uniqueVoices = models.filter(
    (model, index, self) =>
      index === self.findIndex((m) => m.voice === model.voice)
  );

  

  if (!models.length) return <Skeleton className="h-4 w-[250px]" />;

  
  const selectedModel = uniqueVoices.find((m) => m.name === value);

 
  

  return (
    <Select onValueChange={onChangeHandler} value={value} disabled={disabled}>
      <SelectTrigger className="shad-select-trigger bg-zinc-900 border-none">
        <SelectValue placeholder="Pilih Gender Penyanyi" />
      </SelectTrigger>
      <SelectContent className="shad-select-content bg-zinc-800 border-none">
        <SelectGroup>
          {uniqueVoices.map((model, idx) => (
            <SelectItem key={idx} value={model.name}>{model.voice} - {model.domain}</SelectItem>
          ))}
          {/* <SelectItem value="male voice">Laki-laki</SelectItem>
          <SelectItem value="female voice">Perempuan</SelectItem> */}
          {/* Jika ingin render berdasarkan data model, bisa map di sini */}
          {/* models.map(model => <SelectItem key={model} value={model}>{model}</SelectItem>) */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
