import {cacheProvider} from "../../lib/cache/init.js"


export  function cacheRateLimit(ttl=180){

    return async (req, res, next) => {
        let key = `${req.originalurl}:${req.user.id}`;
        const cached = await cacheProvider.get(key);
        if (cached){
            res.setHeader('X-Cashe',"HIT");
            return res.json(JSON.parse (cached));
        }

        const originalJson = res.json.bind(res); 

        res.json = (async (body) =>{
            if(res.statusCode >= 200 && res.statusCode < 300)
           {
            await cacheProvider.set(key, JSON.stringify(body), ttl);
            res.setHeader('X-Cache', "MISS");
           }
            return originalJson(body);
        });

          next();

    }
}
