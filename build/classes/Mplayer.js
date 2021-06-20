"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mplayer = void 0;
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var Mplayer = /** @class */ (function () {
    function Mplayer(music_folder) {
        var _this = this;
        this.music_folder = music_folder;
        this.albums = this.list_albums();
        this.process = child_process_1.spawn("mplayer", ["-slave", "-quiet", "-idle"]);
        this.is_playing = false;
        this.process.on('exit', function (code) {
            _this.process = child_process_1.spawn("mplayer", ["-slave", "-quiet", "-idle"]);
            console.log('Process exited');
        });
        this.process.on('close', function (code) {
            console.log('Process closed');
        });
        this.process.on('spawn', function () {
            console.log('Process spawned');
        });
        this.process.on('error', function (err) {
            console.log('Process with error');
        });
    }
    Mplayer.prototype.run_cmd = function (cmd) {
        if (this.process.stdin != null)
            this.process.stdin.write(cmd);
    };
    Mplayer.prototype.play_album = function (album_name) {
        var index_album = this.albums.includes(album_name);
        if (index_album) {
            var command = "loadlist " + "\"" + this.music_folder + album_name + "/" + album_name + ".m3u" + "\"" + "\n";
            console.log("Loading list command: " + command);
            this.run_cmd(command);
            this.is_playing = true;
        }
        else {
            console.log("Album does not exist");
        }
    };
    Mplayer.prototype.toogle_pause = function () {
        console.log("Toogling pause");
        this.run_cmd("pause\n");
        this.is_playing = !this.is_playing;
    };
    Mplayer.prototype.resume = function () {
        console.log("Is playing? " + this.is_playing);
        if (!this.is_playing)
            this.toogle_pause();
    };
    Mplayer.prototype.pause = function () {
        console.log("Is playing? " + this.is_playing);
        if (this.is_playing)
            this.toogle_pause();
    };
    Mplayer.prototype.next_music = function () {
        this.run_cmd("pt_step 1\n");
    };
    Mplayer.prototype.previous_music = function () {
        this.run_cmd("pt_step -1\n");
    };
    Mplayer.prototype.list_albums = function () {
        var album_list = fs_1.readdirSync(this.music_folder, {
            withFileTypes: true
        })
            .filter(function (dirent) { return dirent.isDirectory(); })
            .map(function (dirent) { return dirent.name; });
        return album_list;
    };
    return Mplayer;
}());
exports.Mplayer = Mplayer;
