import Redis from 'ioredis';


// const redis = new Redis({
//     host: process.env.REDIS_HOST || 'localhost', 
//     port: parseInt(process.env.REDIS_PORT || '6379'), 
//     password: process.env.REDIS_PASSWORD || undefined, 
// });
const redis = new Redis(process.env.REDIS_ENDPOINT!);



export default redis;