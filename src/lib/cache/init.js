import { env } from "node:process";
import { redisCasheProvider } from "../../pkg/cashe/redis.js";
import{env} from "../config/env.js";

export const cacheProvider = new redisCasheProvider({
    host: env.redis.host, 
    port: env.redis.port,
    password: env.redis.password || ''
});