import Koa = require("koa");
import MysqlConnect = require("./../base/MysqlConnect");
import HttpResult = require("./../base/HttpResult");

export async function query(ctx:Koa.Context,next:()=>Promise<any>){
    if(ctx.request.body.type==="home_banner"){
        try{
            let result:any = await next();
            ctx.response.body = HttpResult.CreateSuccessResult(result);
            
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }else{
        ctx.throw(400);
    }
}

export async function queryQuery(ctx:Koa.Context,next:()=>Promise<any>){
    let type = ctx.request.body.type;
    let host = ctx.request.header["origin"];
    let sql = `select path from tb_image_banner where type = '${type}'`;
    return new Promise<HttpResult>(async (resolve:(value:HttpResult)=>void,reject:(vlaue:Error)=>void)=>{
        try{
            let sqlResult = await MysqlConnect.query(sql);
            if(sqlResult.length&&sqlResult.length>0){
                for(let index in sqlResult){
                    sqlResult[index].path = host+sqlResult[index].path;
                }
            }
            resolve(sqlResult);
        }catch(err){
            reject(err);
        }
    })
}