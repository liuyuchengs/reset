"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require("express");
const scheduleCtrl = require("./../controller/scheduleCtrl");
/**
 * @module
 * 排班相关接口
 */
let router = express.Router();
function querybydoctorid(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.doctorId) {
            try {
                let result = yield scheduleCtrl.querybydoctorid(req.body.doctorId);
                res.send(result);
            }
            catch (err) {
                console.log(err);
                res.status(500).end();
            }
        }
        else {
            res.status(400).end();
        }
    });
}
router.use("/querybydoctorid", querybydoctorid);
module.exports = router;
//# sourceMappingURL=scheduleRoute.js.map