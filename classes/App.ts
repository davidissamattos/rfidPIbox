import {RFID} from './RFID'

import { Mplayer } from './Mplayer';
import { wait } from '../utils';


export class App extends RFID{
    music_folder:string;
    // rfid:RFID;
    music_player:Mplayer;

    constructor(music_folder:string){
        super();
        this.music_folder = music_folder;
        this.music_player = new Mplayer(this.music_folder);
    }

    card_controls(card_value:{ [name: string]: string }):void{
        if("album" in card_value)
        {
            console.log("Playing album: " + card_value["album"])
            this.music_player.play_album(card_value["album"]);   
        }
        else if("command" in card_value)
        {
            console.log("Command: " + card_value["command"]);
            switch(card_value["command"])
            {
                case "pause":{
                    console.log("Pausing music");
                    this.music_player.pause(); 
                    break;
                }
                case "play":{
                    console.log("Resume playing");
                    this.music_player.resume(); 
                    break;
                }
                case "next":{
                    console.log("Next music");
                    this.music_player.next_music(); 
                    break;
                }
                case "previous":{
                    console.log("Previous music");
                    this.music_player.previous_music(); 
                    break;
                }
                      
            } 
        }
    }

    run():void{
        console.log("App started running...");
        console.log("Music folder: "+this.music_folder);
    }

}