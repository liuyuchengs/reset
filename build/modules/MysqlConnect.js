"use strict";
/// <reference path="./../../typings/index.d.ts" />
const mysql = require("mysql");
/**
 * @classdesc 数据库连接对象
 * @requries module:mysql
 */
class MysqlConnect {
    /**
     * 获取连接池配置对象
     * @returns {mysql.IPoolConfig} 连接池配置对象
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
     * @returns {mysql.IPool} 连接池对象
     */
    static getPool() {
        if (MysqlConnect._pool === null || MysqlConnect._pool === undefined) {
            MysqlConnect._pool = mysql.createPool(MysqlConnect.getOptions());
        }
        return MysqlConnect._pool;
    }
    /**
     * 使用连接池执行查询操作，通过Promise对象返回结果
     * @param {string} sql - sql查询语句
     * @returns {any} 查询结果
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