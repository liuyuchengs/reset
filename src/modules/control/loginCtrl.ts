import HttpResult = require("./../base/HttpResult");
import MysqlConnect = require("./../base/MysqlConnect");
import Tool = require("./../base/Tool");
import Koa = require("koa");

function check(params:any){
    if(params.phone&&params.password){
        if(/^1[3|4|5|7|8]\d{9}$/.test(params.phone)&&params.password.length>=8&&params.password.length<=20){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

export async function wxlogin(ctx:Koa.Context,next:any){
    if (ctx.request.body.phone && ctx.request.body.password) {
        let result:HttpResult;
        if(check(ctx.request.body)){
            try{
                result =  await next();
            }catch(err){
                console.log(err);
                ctx.throw(500);
            }
        }else{
            result = HttpResult.CreateFailResult("请输入正确的账号或者密码!");
        }
        ctx.response.body = result;
    }
    else {
        ctx.throw(400);
    }
}

export async function wxloginQuery(ctx:Koa.Context){
    let params = ctx.request.body;
    return new Promise<HttpResult>(async (resolve:(value:HttpResult)=>void,reject:(value:Error)=>void)=>{
        let result:HttpResult;
        let sqlResult:any;
        let sql = `select * from (select * from user where phone = '${params.phone}') as users left join user_token as token on users.id = token.user_id`;
        try{
            sqlResult = await MysqlConnect.query(sql);
            if(sqlResult.length>0&&sqlResult[0].password===params.password){
                let resResult = Tool.FilterResult(["id","nickname","phone","face","sex","realname","email","gift_code","alipay","wxpay","referralCode","access_token"],sqlResult[0]);
                resResult["accessToken"] = resResult["access_token"];
                delete resResult["access_token"];
                result = HttpResult.CreateResult(resResult,0,"登录成功!");
            }else{
                result = HttpResult.CreateFailResult("账号或者密码不正确!");
            }
            resolve(result);
        }catch(err){
            reject(err);
        }
    })
}