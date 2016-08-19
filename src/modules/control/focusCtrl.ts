import HttpResult = require("./../base/HttpResult");
import MysqlConnect = require("./../base/MysqlConnect");
import Koa = require("koa");

export async function focusManCount(ctx:Koa.Context,next:()=>any){
    if(ctx.request.body.accessToken&&ctx.request.body.accessToken.length>0){
        try{
            let result:any = await next();
            ctx.response.body = HttpResult.CreateSuccessResult(result[0]);
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }else{
        ctx.throw(400);
    }
}

export async function focusManCountQuery(ctx:Koa.Context){
    let accessToken = ctx.request.body.accessToken;
    let sql = `select count(fansId) as countFansMan,(select count(focusId) from focus where fansId in (select user_id from user_token where access_token='${accessToken}')) as countFocusMan from focus where focusId in (select user_id from user_token where access_token='${accessToken}')`;
    return MysqlConnect.query(sql);
}