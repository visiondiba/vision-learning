import Redis from "ioredis";

const getUrl = () => {
    if (!process.env.REDIS_URL) throw new Error("Put Redis URL, in the .env file!");
    return process.env.REDIS_URL;
}

export const redis = new Redis(getUrl(), {
    maxRetriesPerRequest: 3,
});

redis.on('error', (err) => {console.error("Redis error: ", err)})