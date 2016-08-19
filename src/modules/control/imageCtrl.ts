import Koa = require("koa");
import MysqlConnect = require("./../base/MysqlConnect");

export async function querybyid(ctx:Koa.Context,next:any){
    if(ctx.request.body.type&&ctx.request.body.mainId){
        try{
            let result:any= await next();
            
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }else{
        ctx.throw(400);
    }
}

export async function querybyidQuery(ctx:Koa.Context){
    let params = ctx.request.body;
    let sql:string = null;
    if(params.type==="PRODUCT"){
        sql = `select path as url from product_image where flag = 1 and productid = '${params.mainId}'`;
    }else if(params.type==="HOSPITAL"){
        sql = `select path as url from hospital_image where hospital_id = '${params.mainId}'`;
    }
    if(sql){
        return MysqlConnect.query(sql);
    }else{
        return new Error("type参数错误");
    }
}