import HttpResult = require("./../base/HttpResult");
import MysqlConnect = require("./../base/MysqlConnect");
import Tool = require("./../base/Tool");
import Koa = require("koa");

export async function querybyid(ctx:Koa.Context,next:()=>Promise<any>){
    if(ctx.request.body.id){
        try{
            let queryResult:any = await next();
            let result:any;
            if(queryResult.length>0){
                result = queryResult[0];
            }else{
                result = {};
            }
            ctx.response.body = HttpResult.CreateSuccessResult(result);
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }else{
        ctx.throw(400);
    }
}

export async function querybyidQuery(ctx:Koa.Context){
    let id = ctx.request.body.id;
    let sql = `SELECT h.name,h.address,h.description,h.logo FROM hospital as h WHERE id = '${id}'`;
    return MysqlConnect.query(sql);
}