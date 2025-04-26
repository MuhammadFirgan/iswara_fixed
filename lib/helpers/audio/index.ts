import { newSecretKey } from "@/constans"
import { randomUUID } from "crypto"
import { UTApi } from "uploadthing/server"


export async function generateAudio({
    title,
    lyrics,
    gender,
  }: {
    title: String;
    lyrics: string;
    gender: string;
    }): Promise<{ task_id: string }> {
        const response = await fetch('https://api.musicapi.ai/api/v1/sonic/create', {
            method: 'POST',
            headers: {
                Authorization: newSecretKey as string,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                'custom_mode': true,
                'prompt': lyrics,
                'title': title,
                'tags': `nursery kids song, ${gender} song, harmonica, piano, guitar, drum, volin, tuba, flute, xylophone`,
                'mv': 'sonic-v3-5'
            })
        })

        const result = response.json()
        
        // if(response.status !== 200) {
        //     throw new Error("Gagal membuat musik")
        // }

        return result
        
}

export async function fetchAudio(task_id: string): Promise<{ audio_url: string; duration: number }> {
  const apiUrl = `https://api.musicapi.ai/api/v1/sonic/task/${task_id}`;
  const pollingInterval = 5000; 
  const timeoutDuration = 120000; 
  
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Polling dihentikan karena timeout."));
    }, timeoutDuration);
  });

  const pollRecursive = async (): Promise<{ audio_url: string; duration: number }> => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { Authorization: newSecretKey as string },
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("Status saat ini:", result);

      if (result.message === "success" && result.data[0].audio_url) {
        console.log("Audio berhasil ditemukan!");
        // Mengambil clip pertama sebagai default
        return {
          audio_url: result.data[0].audio_url,
          duration: result.data[0].duration || "",
        };
      } else if (result.type === "not_ready" || result.data[0].audio_url === '' || result.data[0].duration === null) {
        console.log("Audio belum tersedia. Melanjutkan polling...");
        await new Promise((resolve) => setTimeout(resolve, pollingInterval));
        return pollRecursive();
      } else {
        throw new Error(result.error || "Kondisi tidak dikenali.");

      }
    } catch (error) {
      throw error;
    }
  };

  return Promise.race([pollRecursive(), timeoutPromise]) as Promise<{ audio_url: string; duration: number }>;
}

export async function saveAudioToUT(fileBlob: Blob) {
    const fileName = randomUUID()
    const file = new File([fileBlob], `${fileName}.mp3`, { type: "audio/mpeg" });
    const utapi = new UTApi()

    const uploadFile = await utapi.uploadFiles(file)

    if(!uploadFile) {
        throw new Error("Error upload audio")
    }

    return uploadFile.data?.url
}