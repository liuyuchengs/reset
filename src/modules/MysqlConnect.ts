/// <reference path="./../../typings/index.d.ts" />
import mysql = require("mysql");

/**
 * 包装数据库连接对象
 * @module
 */

// 连接池配置对象
let _options : mysql.IPoolConfig = null;
// 连接池对象
let _pool:mysql.IPool = null;

/**
 * 获取连接池配置对象
 * @returns {mysql.IPoolConfig} 连接池配置对象
 */
function getOptions(){
    if(_options===null||_options===undefined){
        _options = {
            user:"root",
            password:"888888",
            database:"uokang",
            connectionLimit:10,
        }
    }
    return _options;
}

/**
 * 获取连接池对象
 * @returns {mysql.IPool} 连接池对象
 */
function getPool(){
    if(_pool===null||_pool===undefined){
        _pool = mysql.createPool(getOptions());
    }
    return _pool;
}

/**
 * 使用连接池执行查询操作，通过Promise对象返回结果
 * @param {string} sql - sql查询语句
 * @returns {any} 查询结果
 */
export function query(sql:string){
    let pool = getPool();
    return new Promise<any>((resolve:(value:any)=>void,reject:(value:any)=>void)=>{
        pool.query(sql,(err:any,rows:any)=>{
            if(err!==null){
                reject(err);
            }else{
                resolve(rows);
            }
        });
    })
}
