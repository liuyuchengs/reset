"use strict";
/// <reference path="./../../typings/index.d.ts"/>
const Connect = require("./../../modules/js/Connect");
let connect = new Connect();
/**
 * loginCtrl
 */
class loginCtrl {
    constructor() {
    }
    static check(params) {
        if (params.phone && params.password) {
            if (/^1[3|4|5|7|8]\d{9}$/.test(params.phone) && params.password.length >= 8 && params.password.length <= 20) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    static login(params, callback) {
        let sql = "select * from user where phone='" + params.phone + "'";
        connect.connect(sql, callback);
    }
}
module.exports = loginCtrl;
