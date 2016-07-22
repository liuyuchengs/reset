/// <reference path="./../../typings/index.d.ts"/>
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");

/**
 * banner图相关的模块
 * @module BannerCtrl
 */

/**
 * 查询banner图
 * @param {string} type - banner图的类型
 * @param {string} host - 图片url添加host，修改成绝对路径
 * @returns {HttpResult|any} 查询得到的结果，异常时返回error异常信息 
 */
export let queryBanner = async function(type:string,host:string):Promise<HttpResult>{
    let sql = "select path from tb_image_banner where type = '"+type+"'";
    try{
        let sqlResult = await MysqlConnect.query(sql);
        return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
            if(sqlResult.length&&sqlResult.length>0){
                for(let index in sqlResult){
                    sqlResult[index].path = host+sqlResult[index].path;
                }
            }
            resolve(HttpResult.CreateSuccessResult(sqlResult));
        })
    }catch(err){
        console.log(err);
        return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
            reject(err);
        })
    }
}