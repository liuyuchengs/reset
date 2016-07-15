/// <reference path="./../../typings/index.d.ts"/>
"use strict";
const express = require('express');
let router = express.Router();
router.post("", (req, res) => {
    if (req.params.accessToken) {
        let accessToken = req.params.accessToken;
        res.send(accessToken);
    }
    else {
        res.status(400).send("no accessToken");
    }
});
module.exports = router;
//# sourceMappingURL=userRoute.js.map