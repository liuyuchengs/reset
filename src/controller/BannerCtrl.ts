/// <reference path="./../../typings/index.d.ts"/>
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import stringFormat = require("string-format");
/**
 * banner图相关的模块
 * @module
 */

/**
 * 查询banner图
 * @param {string} type - banner图的类型
 * @param {string} host - 图片url添加host，修改成绝对路径
 * @returns {HttpResult} 查询得到的结果，异常时返回error异常信息 
 */
export let queryBanner = async function(type:string,host:string):Promise<HttpResult>{
    let sql = "select path from tb_image_banner where type = '{0}'";
    sql = stringFormat.format(sql,type);
    return new Promise<HttpResult>(async (resolve:(value:HttpResult)=>void,reject:(vlaue:Error)=>void)=>{
        try{
            let sqlResult = await MysqlConnect.query(sql);
            if(sqlResult.length&&sqlResult.length>0){
                for(let index in sqlResult){
                    sqlResult[index].path = host+sqlResult[index].path;
                }
            }
            resolve(HttpResult.CreateSuccessResult(sqlResult));
        }catch(err){
            reject(err);
        }
    })
}