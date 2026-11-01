export function idempotency (ttl){
    return async function (req, res, next ){
        const idempotency = req.headers('idempotency-key');
        let key = `$(req.method):$(req.originalUrl):$(idempotency)`;
        const cached = await cacheProvider.get(key);
        if(cached){
            res.setHeaders('X-Cache', 'HIT')
            return res.json(JSON.parse(cached));
        }
        const originalJson = res.json.bind(res);

        res.json = (async (body) => {
            await cacheProvider.set(key, JSON.stringify(body), ttl);
            res.setHeaders('X-Cache', 'MISS');
            return originalJson(body)
        })
        next();
        }
}