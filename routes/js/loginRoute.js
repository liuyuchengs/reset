"use strict";
/// <reference path="./../../typings/index.d.ts"/>
const express = require('express');
const loginCtrl = require("./../../controller/js/loginCtrl");
let router = express.Router();
router.post("", (req, res) => {
    if (req.body.phone && req.body.password) {
        if (loginCtrl.check(req.body)) {
            loginCtrl.login(req.body, (err, rows, fields) => {
                if (err !== null) {
                    res.send("no");
                }
                else {
                    var result = {
                        code:0,
                        message:"登录成功!",
                        data:rows[0]
                    }
                    res.send(result);
                }
            });
        }
        else {
            res.status(400).send("bad params");
        }
    }
    else {
        res.status(400).send("bad params");
    }
});
module.exports = router;
