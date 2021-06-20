"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RFID = void 0;
var NFC = require('nfc-pcsc').NFC; //https://github.com/pokusew/nfc-pcsc
var RFID = /** @class */ (function () {
    function RFID() {
        this.nfc = new NFC();
        this.init();
    }
    RFID.prototype.extractword = function (str, start, end) {
        var s = "";
        var startindex = str.indexOf(start);
        var endindex = str.indexOf(end, startindex) + 1;
        if (startindex != -1 && endindex != -1 && endindex > startindex)
            s = str.substring(startindex, endindex);
        return s;
    };
    RFID.prototype.readCard = function (reader) {
        return __awaiter(this, void 0, void 0, function () {
            var KEY_TYPE_A, key, payload, i, data, card_value, err_1, empty_payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        KEY_TYPE_A = 0x60;
                        key = 'FFFFFFFFFFFF';
                        payload = "";
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 32)) return [3 /*break*/, 5];
                        return [4 /*yield*/, reader.authenticate(i, KEY_TYPE_A, key)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, reader.read(i, 48, 16)];
                    case 3:
                        data = _a.sent();
                        payload = payload + data.toString();
                        i = i + 4;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5:
                        card_value = JSON.parse(this.extractword(payload, "{", "}"));
                        console.log(card_value);
                        return [2 /*return*/, card_value];
                    case 6:
                        err_1 = _a.sent();
                        console.log(err_1);
                        console.log('Failed to read data');
                        empty_payload = JSON.parse("{}");
                        return [2 /*return*/, empty_payload];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    RFID.prototype.card_controls = function (card_value) {
        console.log("Needs to be implemented");
    };
    RFID.prototype.init = function () {
        var _this = this;
        // In this function we attach the event handlers of the nfc library
        this.nfc.on('reader', function (reader) {
            var status = reader.reader.name + "  device attached";
            reader.on('card', function (card) { return __awaiter(_this, void 0, void 0, function () {
                var card_value, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(reader.reader.name + "  card detected");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.readCard(reader)];
                        case 2:
                            card_value = _a.sent();
                            //Now we do something with the payload of the card
                            this.card_controls(card_value);
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return RFID;
}());
exports.RFID = RFID;
