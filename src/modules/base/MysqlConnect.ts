/// <reference path="./../../../typings/index.d.ts" />
import mysql = require("mysql");

/**
 * 包装数据库连接对象
 * @module
 */

// 连接池配置对象
let _options : mysql.IPoolConfig = null;
// 连接池对象
let _pool:mysql.IPool = null;
// 链接环境
let env = "aliyun";

/**
 * 获取连接池配置对象
 * @returns {mysql.IPoolConfig} 连接池配置对象
 */
function getOptions(){
    if(!_options){
        switch(env){
            // 测试数据库
            case "test":
                _options = {
                    host:"192.168.0.222",
                    port:3306,
                    user:"root",
                    password:"uokang",
                    database:"uokang",
                    connectionLimit:10,
                };
                break;
            // 本机数据库
            case "local":            
                _options = {
                    user:"root",
                    password:"888888",
                    database:"uokang",
                    connectionLimit:10,
                };
                break;
            case "aliyun":
                // 正式
                _options = {
                    host:"120.24.181.195",
                    port:3306,
                    user:"uokang",
                    password:"zdfsdf_)($^&65612sdfsdf*&*88eeee",
                    database:"uokang",
                    connectionLimit:10,
                };
                break;
        }
    }
    return _options;
}

/**
 * 获取连接池对象
 * @returns {mysql.IPool} 连接池对象
 */
function getPool(){
    if(!_pool){
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
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        });
    })
}