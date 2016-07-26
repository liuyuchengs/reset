"use strict";
/// <reference path="./../../typings/index.d.ts" />
const mysql = require("mysql");
/**
 * 包装数据库连接对象
 * @module
 */
// 连接池配置对象
let _options = null;
// 连接池对象
let _pool = null;
/**
 * 获取连接池配置对象
 * @returns {mysql.IPoolConfig} 连接池配置对象
 */
function getOptions() {
    if (_options === null || _options === undefined) {
        _options = {
            user: "root",
            password: "888888",
            database: "uokang",
            connectionLimit: 10,
        };
    }
    return _options;
}
/**
 * 获取连接池对象
 * @returns {mysql.IPool} 连接池对象
 */
function getPool() {
    if (_pool === null || _pool === undefined) {
        _pool = mysql.createPool(getOptions());
    }
    return _pool;
}
/**
 * 使用连接池执行查询操作，通过Promise对象返回结果
 * @param {string} sql - sql查询语句
 * @returns {any} 查询结果
 */
function query(sql) {
    let pool = getPool();
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
exports.query = query;
//# sourceMappingURL=MysqlConnect.js.map