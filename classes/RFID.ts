const { NFC } = require('nfc-pcsc');//https://github.com/pokusew/nfc-pcsc


export class RFID{
    nfc:any;//We don't have a type from the github repo

    constructor(){
        this.nfc = new NFC();
        this.init();

    }

    private extractword(str:string, start:string, end:string):string{
        var s:string = "";
        var startindex = str.indexOf(start);
        var endindex = str.indexOf(end, startindex)+1;
        if (startindex !=-1 && endindex !=-1 &&  endindex  > startindex )
        s = str.substring(startindex , endindex)
        return s
      }

    private async readCard(reader:any):Promise<{[name: string]: string }>{
        try{
            const KEY_TYPE_A:number = 0x60;
            const key:string = 'FFFFFFFFFFFF';
            var payload:string = "";
            for(let i:number=0; i<=32 ;){
                await reader.authenticate(i, KEY_TYPE_A, key);
                var data = await reader.read(i, 48, 16);
                payload = payload + data.toString();
                i=i+4;
            }
            var card_value = JSON.parse(this.extractword(payload,"{","}"));
            console.log(card_value)
            return card_value
        }
        catch(err){
            console.log(err)
            console.log('Failed to read data');
            var empty_payload=JSON.parse("{}");
            return empty_payload
        }
    }
    
    card_controls(card_value:{ [name: string]: string }):void{
        console.log("Needs to be implemented");
    }

    private init():void{
        // In this function we attach the event handlers of the nfc library
        this.nfc.on('reader', (reader:any):void => {
            var status:string = `${reader.reader.name}  device attached`;
        
            reader.on('card', async (card:any):Promise<void> => {
                console.log(`${reader.reader.name}  card detected`);
                // const uid = card.uid;
                var card_value:{ [name: string]: string };
                try{
                    card_value = await this.readCard(reader);
                    //Now we do something with the payload of the card
                    this.card_controls(card_value);
                }
                catch(err){
                }
                
                
            });
        });

    }

}


