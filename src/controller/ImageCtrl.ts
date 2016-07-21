import NodeData = require("NodeData");
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import Tool = require("./../modules/Tool");
/**
 * ImageCtrl
 */
class ImageCtrl {
    constructor() {
        
    }
    static async queryImage(params:any){
        let sql:string = null;
        if(params.type==="PRODUCT"){
            sql = "select path as url from product_image where flag = 1 and productid = "+ params.mainId;
        }else if(params.type==="HOSPITAL"){
            sql = "select path as url from hospital_image where hospital_id = "+ params.mainId;
        }
        if(sql){
            try{
                let result:HttpResult = await MysqlConnect.query(sql);
                return new Promise<HttpResult>((resolve:(value:HttpResult)=>void)=>{
                    resolve(result);
                })
            }catch(err){
                return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
                    reject(err);
                })
            }
        }
    }
}

export = ImageCtrl;