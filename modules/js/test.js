var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/// <reference path="./../../typings/index.d.ts" />
let fs = require("fs");
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, res) => {
            if (err !== null) {
                reject(err);
            }
            else {
                resolve(res.toString());
            }
        });
    });
}
var fn = function () {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield readFile("./text.txt");
        console.log(result);
    });
};
fn();
