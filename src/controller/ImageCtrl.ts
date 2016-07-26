import NodeData = require("NodeData");
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import Tool = require("./../modules/Tool");
/**
 * 图片查询相关模块
 * @module
 */

/**
 * 查询医院或者项目图片
 * @param {any} params - 经过express parser转换后的req.body,需有mainId和type属性
 * @returns {HttpResult} 查询结果，异常时返回error异常对象
 */
export async function queryImage(params:any):Promise<HttpResult|any>{
    return new Promise<HttpResult>(async (resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
        let sql:string = null;
        if(params.type==="PRODUCT"){
            sql = `select path as url from product_image where flag = 1 and productid = '${params.mainId}'`;
        }else if(params.type==="HOSPITAL"){
            sql = `select path as url from hospital_image where hospital_id = '${params.mainId}'`;
        }
        if(sql){
            try{
                let result:HttpResult = await MysqlConnect.query(sql);
                resolve(result);
            }catch(err){
                reject(err);
            }
        }else{
            reject(new Error("type参数错误"));
        }
    })
}