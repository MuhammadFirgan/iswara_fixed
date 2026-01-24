// import { Redis } from 'ioredis';

// // Pastikan variabel lingkungan REDIS_URL sudah disetel di Vercel
// const redisUrl = process.env.UPSTASH_REDIS_REST_URL; 

// if (!redisUrl) {
//     console.warn('REDIS_URL not found. Caching will be skipped.');
//     throw new Error('REDIS_URL is not set in environment variables.');
// }

// // Gunakan URL untuk koneksi di lingkungan Vercel
// const redis = new Redis(redisUrl, {
//     // Mengaktifkan TLS/SSL untuk koneksi aman. INI SANGAT PENTING
//     // untuk menghindari ECONNRESET dari Redis Cloud.
//     connectTimeout: 10000, // Tambahkan: 10 detik untuk koneksi awal
//     commandTimeout: 5000,  // Tambahkan: 5 detik untuk setiap perintah (GET, SET, DEL)

//     tls: {
//         rejectUnauthorized: false,
//     },
    
//     // Mengatur agar ioredis tidak mencoba lagi secara berlebihan
//     // Kita kurangi retries per request untuk menghindari timeout.
//     maxRetriesPerRequest: 3, 
    
//     // Strategi coba lagi kustom untuk mengontrol penundaan.
//     retryStrategy(times) {
//         const delay = Math.min(times * 100, 2000); // Penundaan: 100ms, 200ms, ... maks 2000ms
//         if (times > 5) {
//             // Setelah 5 kali percobaan, hentikan proses (return null)
//             return null; 
//         }
//         return delay;
//     }
// });

// // Tambahkan error handling untuk mencatat masalah tanpa merusak aplikasi.
// redis.on('error', (err) => {
//     // Catat error ke console saat koneksi gagal
//     console.error('Redis Connection Error:', err);
// });

// export default redis;

// lib/redis.ts
import { Redis } from '@upstash/redis';

// Ambil dari environment variables Vercel
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl || !redisToken) {
  throw new Error(
    'Upstash Redis environment variables not set. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
  );
}

// Buat instance Redis
const redis = new Redis({
  url: redisUrl,
  token: redisToken,
  // Opsional: nonaktifkan cache HTTP jika diperlukan
  enableAutoPipelining: false,
});

export default redis;
