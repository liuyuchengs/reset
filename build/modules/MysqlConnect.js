"use strict";
/// <reference path="./../../typings/index.d.ts" />
const mysql = require("mysql");
/**
 * Connect
 */
class MysqlConnect {
    /**
     * 获取连接池配置对象
     */
    static getOptions() {
        if (MysqlConnect._options === null || MysqlConnect._options === undefined) {
            MysqlConnect._options = {
                user: "root",
                password: "888888",
                database: "uokang",
                connectionLimit: 10,
            };
        }
        return MysqlConnect._options;
    }
    /**
     * 获取连接池对象
     */
    static getPool() {
        if (MysqlConnect._pool === null || MysqlConnect._pool === undefined) {
            MysqlConnect._pool = mysql.createPool(MysqlConnect.getOptions());
        }
        return MysqlConnect._pool;
    }
    /**
     * 使用连接池执行查询操作
     */
    static query(sql) {
        let pool = MysqlConnect.getPool();
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, rows) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
}
module.exports = MysqlConnect;
//# sourceMappingURL=MysqlConnect.js.map