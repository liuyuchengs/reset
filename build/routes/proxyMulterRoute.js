"use strict";
const express = require("express");
const Multer = require("./../modules/Multers");
const multer = new Multer("public/upload");
const upload = multer.getUpLoad();
const router = express.Router();
/**
 * 修改用户信息
 */
let params = [];
router.use("/wx/withDraw/bound", upload.fields(params), (req, res, next) => {
});
module.exports = router;
//# sourceMappingURL=proxyMulterRoute.js.map