import { ChildProcess, spawn } from 'child_process';
import { readdirSync } from 'fs';

export class Mplayer{
    process:ChildProcess;
    music_folder:string;
    albums:string[];
    is_playing:boolean;

    constructor(music_folder:string){
        this.music_folder = music_folder;
        this.albums = this.list_albums();
        this.process = spawn("mplayer", ["-slave", "-quiet", "-idle"]);
        this.is_playing = false;


        this.process.on('exit', (code) => {
            this.process = spawn("mplayer", ["-slave", "-quiet", "-idle"]);
            console.log('Process exited')
        });
        this.process.on('close', (code) => {
            console.log('Process closed')
        });
        this.process.on('spawn', () => {
            console.log('Process spawned')
        });
        this.process.on('error', (err) => {
            console.log('Process with error')
        });
        
    }

    run_cmd(cmd:string){
        if(this.process.stdin!=null)
                this.process.stdin.write(cmd);
    }


    play_album(album_name:string){
        var index_album:boolean = this.albums.includes(album_name);
        if(index_album){
            var command:string = "loadlist " + "\""+ this.music_folder+album_name+"/"+album_name+".m3u" + "\"" + "\n"
            console.log("Loading list command: " + command);
            this.run_cmd(command);
            this.is_playing = true;
        }
        else{
            console.log("Album does not exist")
        }
            
    }

    toogle_pause(){
        // console.log("Toogling pause");
        this.run_cmd("pause\n");
        this.is_playing = !this.is_playing;
    }

    resume(){
        // console.log("Is playing? " + this.is_playing)
        if(!this.is_playing)
            this.toogle_pause()
    }

    pause(){
        // console.log("Is playing? " + this.is_playing)
        if(this.is_playing)
            this.toogle_pause()
    }

    next_music(){
        this.run_cmd("pt_step 1\n");
    }

    previous_music(){
        this.run_cmd("pt_step -1\n");
    }


    list_albums():string[]{
        var album_list:string[] = readdirSync(this.music_folder, {     
            withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        return album_list
    }
}