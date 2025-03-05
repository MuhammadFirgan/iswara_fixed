'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createCloneAudio } from "@/lib/actions/cloneAudio.action";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const allowedFile = ["audio/mpeg", "audio/wav"];

export default function MyModal({ isOpen, onClose }: ModalProps) {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (!allowedFile.includes(selectedFile.type)) {
        setError("Hanya file .mp3 dan .wav yang diijinkan");
      } else if (selectedFile.size > 8 * 1024 * 1024) {
        setError("File terlalu besar, Max: 8MB");
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };


  const handleClickUpload = async () => {
    if (!file) {
      setError("Silakan pilih file terlebih dahulu");
      return;
    }

    try {
      setIsSubmitting(true); 
      await createCloneAudio({ name, myFile: file });
      onClose(); 
      router.refresh(); 
    } catch (e) {
      console.error(e);
      setError("Gagal mengunggah file. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-200"
          onClick={onClose}
        >
        </button>

        <h2 className="text-xl font-bold mb-4">Form Modal</h2>
        <span className="text-xs text-red-500">{error}</span>

        <div className="mt-6 flex flex-col space-y-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="name">Nama Suara</Label>
            <Input
              type="text"
              name="name"
              className="border-none bg-neutral-800"
              placeholder="Masukkan Nama Suara..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex gap-3 flex-col">
            <Input
              type="file"
              id="upload"
              className="border-none -py-2 file:mr-4 file:rounded-full file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-100"
              onChange={handleFileChange}
              accept=".mp3, .wav"
              required
            />
          </div>

          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleClickUpload} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Memproses
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                <>Kirim</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}