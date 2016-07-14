"use strict";
/// <reference path="./../../typings/index.d.ts" />
const mysql = require("mysql");
/**
 * Connect
 */
class Connect {
    /**
     *  构建连接对象
     */
    constructor() {
        this._options = {
            user: "root",
            password: "888888",
            database: "uokang",
        };
    }
    get options() {
        return this._options;
    }
    set options(v) {
        this._options = v;
    }
    /**
     *  建立连接
     */
    connect(sql, callback) {
        let connect = mysql.createConnection(this._options);
        connect.connect();
        connect.query(sql, callback);
    }
}
module.exports = Connect;
