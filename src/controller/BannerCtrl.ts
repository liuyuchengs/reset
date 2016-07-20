/// <reference path="./../../typings/index.d.ts"/>
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");

/**
 * BannerCtrl
 */
class BannerCtrl {
    constructor() {}
    static async queryBanner(type:string,host:string):Promise<HttpResult>{
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
}

export = BannerCtrl;