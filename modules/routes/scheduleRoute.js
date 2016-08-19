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
 * 排班相关接口
 * @module
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
function autoSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let date = new Date();
        let times = ['9:00:00', '10:00:00', '11:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00'];
        let days = [];
        for (let index = 0; index < 7; index++) {
            days.push(date.toISOString().slice(0, 10));
            date.setDate(date.getDate() + 1);
        }
        try {
            let result = yield scheduleCtrl.autoSchedule(days, times);
            res.send(result);
        }
        catch (err) {
            res.status(400).end();
        }
    });
}
router.use("/autoSchedule", autoSchedule);
module.exports = router;
//# sourceMappingURL=scheduleRoute.js.map