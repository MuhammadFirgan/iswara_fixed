'use client';
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createCloneAudio, getCloneAudio } from "@/lib/actions/cloneAudio.action";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IClone } from "@/lib/database/models/clone.model";

type DropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
};

const allowedFileTypes = ["audio/mpeg", "audio/wav"];

export default function CloneAudio({ value, onChangeHandler }: DropdownProps) {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Kontrol modal
  const [cloneVoices, setCloneVoices] = useState<IClone[]>([]);

  const router = useRouter();

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (!allowedFileTypes.includes(selectedFile.type)) {
        setError("Hanya file .mp3 dan .wav yang diizinkan");
      } else if (selectedFile.size > 8 * 1024 * 1024) {
        setError("File terlalu besar, Max: 8MB");
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  // Handle upload submission
  const handleClickUpload = async () => {
    if (!file) {
      setError("Silakan pilih file terlebih dahulu");
      return;
    }

    try {
      setIsSubmitting(true);
      await createCloneAudio({ name, myFile: file });
      // Refresh data clone voices after successful upload
      await getVoices();
      setIsModalOpen(false); // Close modal
    } catch (e) {
      console.error(e);
      setError("Gagal mengunggah file. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch clone voices
  const getVoices = async () => {
    const voiceList = await getCloneAudio();
    setCloneVoices(voiceList);
  };

  useEffect(() => {
    getVoices();
  }, []);

  return (
    <>
      {/* Dropdown for selecting existing voices */}
      <Select onValueChange={onChangeHandler} value={value}>
        <SelectTrigger className="shad-select-trigger bg-zinc-900 border-none">
          <SelectValue placeholder="Pilih Tiruan Suara" />
        </SelectTrigger>
        <SelectContent className="shad-select-content bg-zinc-800 border-none">
          <SelectGroup>
            {cloneVoices.map((cloneVoice: IClone) => (
              <SelectItem key={cloneVoice._id} value={cloneVoice._id}>
                {cloneVoice.name}
              </SelectItem>
            ))}
            <Button
              onClick={() => setIsModalOpen(true)} // Open modal
              className="w-full"
            >
              Tambah suara tiruan
            </Button>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Modal for adding new voice */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
          <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-md relative">
          

            <h2 className="text-xl font-bold mb-4">Tambah Suara Baru</h2>
            {error && <span className="text-xs text-red-500">{error}</span>}

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
                  accept=".mp3,.wav"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)} // Close modal
                  disabled={isSubmitting}
                >
                  Batal
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
      )}
    </>
  );
}