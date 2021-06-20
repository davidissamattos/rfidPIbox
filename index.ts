#!/usr/bin/env node
import {App} from './classes/App'
const MUSIC_FOLDER:string|undefined = process.env.MUSIC_FOLDER

if(MUSIC_FOLDER!=undefined)
    var app = new App(MUSIC_FOLDER);
else
    var app = new App("./music/");
app.run();
