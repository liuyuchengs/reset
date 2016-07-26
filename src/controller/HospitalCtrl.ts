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
 * @returns {object} 返回查询结果
 */
export async function queryById(id:number):Promise<any>{
    return new Promise<any>(async (resolve:(value:any)=>void,reject:(value:Error)=>void)=>{
        let sql = "SELECT h.name,h.address,h.description,h.logo FROM hospital as h WHERE id = '"+id+"'";
        try{
            let queryResult = await MysqlConnect.query(sql);
            if(queryResult.length>0){
                resolve(queryResult[0]);
            }else{
                resolve({});
            }
        }catch(err){
            reject(err);
        }
    })
}