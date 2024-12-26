import mongoose from 'mongoose'



const MONGODB_URL = process.env.MONGODB_URL

let cached = (global as any) || { conn: null, promise:null }

export const dbConnect = async () => {
    if(cached.conn) return cached.conn

    if(!MONGODB_URL) throw new Error('Connection uri is missing')
    
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'iswara',
        bufferCommands: false
    })

    cached.conn = await cached.promise


    return cached.conn
}