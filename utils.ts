export function wait(ms:number){
    var start:number = new Date().getTime();
    var end:number = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }