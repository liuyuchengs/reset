import HttpResult = require("./../base/HttpResult");
import MysqlConnect = require("./../base/MysqlConnect");
import Tool = require("./../base/Tool");
import Koa = require("koa");

export async function querybydoctorid(ctx:Koa.Context,next:()=>{}){
    if(Tool.checkObjectPropsEmpty(ctx.request.body,["doctorId"])){
        ctx.throw(400);
    }else{
        try{
            let result:any = await next();
            ctx.response.body = result;
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }
}

export async function querybydoctoridQuery(ctx:Koa.Context){
    let id = ctx.request.body.doctorId;
    let date = new Date();
    let sql = `SELECT id as scheduleid,starttime,date as dateStr FROM schedule WHERE status = '1' AND doctorid = '${id}' AND YEAR(date)= '${date.getFullYear()}' AND MONTH(date)= '${(date.getMonth()+1)}' AND DAY(date) >= '${date.getDate()}'`;
    return new Promise<any>(async (resolve:(value:any)=>void,reject:(value:any)=>void)=>{
        try{
            let queryResult = await MysqlConnect.query(sql);
            let result:any[] = [];
            for(let index in queryResult){
                queryResult[index].date = queryResult[index].dateStr.toLocaleDateString()+" "+queryResult[index].starttime.slice(0,5);
                queryResult[index].dateStr = queryResult[index].dateStr.toLocaleDateString();
                if(result.length>0){
                    if(result[result.length-1].date!=queryResult[index].dateStr){
                        result.push({date:queryResult[index].dateStr,timeList:[]});
                    }
                }else{
                    result.push({date:queryResult[index].dateStr,timeList:[]});
                }
            }
            let indexCount = 0;
            for(let index in queryResult){
                if(result.length>0){
                    if(result[indexCount].date != queryResult[index].dateStr){
                        indexCount++;
                    }
                    result[indexCount].timeList.push(queryResult[index]);
                }
            }
            resolve(result);
        }catch(err){
            reject(err);
        }
    })
}