// lib/cache.ts
import redis from "./redis";

const TTL = 3600;

interface RevalidateCacheParams {
  slug?: string;
  authorNip?: string;
}

export async function revalidateCache({ slug, authorNip }: RevalidateCacheParams) {
  try {
    if (slug) {
      await redis.del(`audio:slug:${slug}`);
    }

    await redis.del('audios:all');

    const keys = await redis.keys('audios:query:*');
    for (const key of keys) {
      await redis.del(key); // ✅ Loop satu per satu
    }

    if (authorNip) {
      await redis.del(`audio:author:${authorNip}`);
    }
  } catch (error) {
    console.error("revalidateCache error:", error);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getCachedOrDB(cacheKey: string, dbQuery: () => Promise<any>) {
  const cached = await redis.get(cacheKey);

  if (cached && typeof cached === 'string') {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.warn('Corrupted cache, ignoring:', cacheKey);
    }
  }

  const result = await dbQuery();

  // ✅ Gunakan redis.set dengan opsi { ex }
  await redis.set(cacheKey, JSON.stringify(result), { ex: TTL });

  return result;
}