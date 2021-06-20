"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var RFID_1 = require("./RFID");
var Mplayer_1 = require("./Mplayer");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(music_folder) {
        var _this = _super.call(this) || this;
        _this.music_folder = music_folder;
        _this.music_player = new Mplayer_1.Mplayer(_this.music_folder);
        return _this;
    }
    App.prototype.card_controls = function (card_value) {
        if ("album" in card_value) {
            console.log("Playing album: " + card_value["album"]);
            this.music_player.play_album(card_value["album"]);
        }
        else if ("command" in card_value) {
            console.log("Command: " + card_value["command"]);
            switch (card_value["command"]) {
                case "pause": {
                    console.log("Pausing music");
                    this.music_player.pause();
                    break;
                }
                case "play": {
                    console.log("Resume playing");
                    this.music_player.resume();
                    break;
                }
                case "next": {
                    console.log("Next music");
                    this.music_player.next_music();
                    break;
                }
                case "previous": {
                    console.log("Previous music");
                    this.music_player.previous_music();
                    break;
                }
            }
        }
    };
    App.prototype.run = function () {
        console.log("App started running...");
        console.log("Music folder: " + this.music_folder);
    };
    return App;
}(RFID_1.RFID));
exports.App = App;
