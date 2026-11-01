console.log("fhufj");

import http from 'http';
import { createApp } from '../app.js';

const server = http.createServer(createApp());
console.log("createapp finished")
server.listen(3009,()=> {console.log('server is running on port 3009')});


async function shutdown(){
    logger.info("shutdown request");

   server.close( async  () => {
   try  {
    await db.destroy();
    }catch{}
    process.exit(0);
});
setTimeout(() => process.exit(1), 10_000).unref();
}

 
process.on('SIGINT', shutdown);
process.on('SIGTREM',shutdown)