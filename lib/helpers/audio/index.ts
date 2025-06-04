import { newSecretKey, prosaApiKey, prosaUrl } from "@/constans"
import { randomUUID } from "crypto"
import { UTApi } from "uploadthing/server"
import { request } from "./prosa";


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

// export async function fetchAudio(task_id: string): Promise<{ audio_url: string; duration: number; lyrics: string }> {
//   const apiUrl = `https://api.musicapi.ai/api/v1/sonic/task/${task_id}`;
//   const pollingInterval = 3000; 
//   const timeoutDuration = 60000; 
  
//   const timeoutPromise = new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error("Polling dihentikan karena timeout."));
//     }, timeoutDuration);
//   });

//   const pollRecursive = async (): Promise<{ audio_url: string; duration: number; lyrics: string }> => {
//     try {
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: { Authorization: newSecretKey as string },
//         next: { revalidate: 0 },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

    

//       if (result.message === "success" && result.data[0].audio_url) {
//         console.log("Audio berhasil ditemukan!");
//         // Mengambil clip pertama sebagai default
//         return {
//           audio_url: result.data[0].audio_url,
//           duration: result.data[0].duration || "",
//           lyrics: result.data[0].lyrics
//         };
//       } else if (result.type === "not_ready" || result.data[0].audio_url === '' || result.data[0].duration === null) {
//         console.log("Audio belum tersedia. Melanjutkan polling...");
//         await new Promise((resolve) => setTimeout(resolve, pollingInterval));
//         return pollRecursive();
//       } else {
//         throw new Error(result.error || "Kondisi tidak dikenali.");

//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   return Promise.race([pollRecursive(), timeoutPromise]) as Promise<{ audio_url: string; duration: number; lyrics: string }>;
// }


export async function submitItsRequest(text: string, audio_format: string, model: string) {
  
  const payload = {
    config: {
      model,
      wait: false,
      audio_format
    },

    request: {
      text
    }
  }

  return await request(prosaUrl as string, "POST", {
    json: payload,
    headers: {
      "x-api-key": prosaApiKey
    }
  })

}

export async function queryTtsResult(jobId: string): Promise<{ audioBuffer: Buffer; duration: Number }> {
  let attempts = 0

  const pollingInterval = 5000; 
  const timeoutDuration = 60000; 
  const maxAttempts = timeoutDuration / pollingInterval; 

  const pollRecursive = async (): Promise<{ audioBuffer: Buffer; duration: Number }> => {
    if (attempts >= maxAttempts) {
      throw new Error("Polling melebihi batas maksimal percobaan.");
    }

    attempts++;   
    const res = await request(`${prosaUrl}/${jobId}`, "GET", {
      headers: {
        "x-api-key": prosaApiKey
      }
    })
    if (res["status"] === "complete") {
      console.log("result audio : ", res["result"])
     
      let base64AudioData = res["result"]["data"];
      let duration = res["result"]["duration"] 

      if (!base64AudioData || typeof base64AudioData !== "string") {
        console.error("Data audio tidak valid atau kosong:", base64AudioData);
        throw new Error("Gagal mendapatkan audio: data kosong atau tidak valid.");
      }
      // return Buffer.from(base64AudioData, "base64");
      return {
        audioBuffer: Buffer.from(base64AudioData, "base64"),
        duration
      }
    }
    await new Promise((resolve) => setTimeout(resolve, pollingInterval));
    return pollRecursive();
  }

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Timeout: polling dihentikan."));
    }, timeoutDuration);
  });

  return Promise.race([pollRecursive(), timeoutPromise]);


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