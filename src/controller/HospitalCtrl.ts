import NodeData = require("NodeData");
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import Tool = require("./../modules/Tool");
/**
 * 医学相关模块
 * @module
 */

/**
 * 根据医院id查询医院信息
 * @param {number} id - 医院id
 * @returns {Object|Error} 返回查询结果
 */
export async function queryById(id:number):Promise<any>{
    let sql = "select h.name,h.address,h.description,h.logo from hospital as h where id = "+id;
    try{
        let queryResult = await MysqlConnect.query(sql);
        return new Promise<any>((resolve:(value:any)=>void)=>{
            if(queryResult.length>0){
                resolve(queryResult[0]);
            }else{
                resolve({});
            }
        })
    }catch(err){
        return new Promise<HttpResult>((resolve:(value:any)=>void,reject:(value:any)=>void)=>{
            reject(err);
        })
    }
}