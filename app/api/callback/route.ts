import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse body request
        const callbackData = await req.json();
    
        // Log data callback untuk debugging
        console.log('Callback received:', callbackData);
    
        // Validasi callback
        if (callbackData.code === 200 && callbackData.data.callbackType === 'complete') {
          const taskId = callbackData.data.task_id;
          const audioData = callbackData.data.data[0]; // Ambil data trek pertama
    
          console.log(`Task ID: ${taskId}`);
          console.log(`Audio URL: ${audioData.audio_url}`);
          console.log(`Image URL: ${audioData.image_url}`);
    
          // Simpan informasi ke database atau lakukan tindakan lainnya
          // Misalnya, simpan ke database:
          // await saveToDatabase(taskId, audioData.audio_url, audioData.image_url);
    
          // Kirim respons ke sistem bahwa callback telah diterima
          return new Response('Callback received successfully', { status: 200 });
        } else {
          console.error('Invalid callback data:', callbackData);
          return new Response('Invalid callback data', { status: 400 });
        }
      } catch (error) {
        console.error('Error processing callback:', error);
        return new Response('Internal server error', { status: 500 });
      }
}