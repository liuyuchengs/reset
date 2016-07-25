import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import Tool = require("./../modules/Tool");

/**
 * 医院相关模块
 * @module
 */

/**
 * 查询医院详细信息
 * @param {number} id - 医院id
 * @returns {object|error} 返回查询结果
 */
export async function queryById(id:number):Promise<any>{
    let sql = "SELECT h.name,h.address,h.description,h.logo FROM hospital as h WHERE id = '"+id+"'";
    try{
        let queryResult = await MysqlConnect.query(sql);
        return new Promise<any>((resolve:(value:any)=>void)=>{
            if(queryResult.length>0){
                return resolve(queryResult[0]);
            }else{
                return resolve({});
            }
        })
    }catch(err){
        return new Promise<any>((resolve:(value:any)=>void,reject:(value:any)=>void)=>{
            reject(err);
        })
    }
}