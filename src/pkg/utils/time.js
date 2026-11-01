export function toMs (time, unit){
    switch(unit){
        case 'seconds':
            return time * 1000; 
         case 'minutes':
            return time * 60 *1000;
        case 'hours': 
            return time * 60 * 60 * 1000;
         default: 
            return time ;
    }
 
}