import redis from "./redis"

const TTL = 3600


interface RevalidateCacheParams {
  slug?: string
  authorNip?: string
}

export async function revalidateCache({ slug, authorNip }: RevalidateCacheParams) {
    try {
        if (slug) {
            await redis.del(`audio:slug:${slug}`)
          }
      
          
          await redis.del('audios:all')
      
          
          const keys = await redis.keys('audios:query:*')
          if (keys.length > 0) {
            await redis.del(...keys)
          }
      
          
          if (authorNip) {
            await redis.del(`audio:author:${authorNip}`)
          }
    } catch (error) {
        console.error(error)
    }
}

export async function getCachedOrDB(cacheKey: string, dbQuery: () => Promise<any>) {
  const cached = await redis.get(cacheKey)

  if(cached) return JSON.parse(cached)

  const result = await dbQuery()

  await redis.setex(cacheKey, 3600, JSON.stringify(result))

  return result

}