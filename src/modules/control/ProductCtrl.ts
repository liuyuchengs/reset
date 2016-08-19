import HttpResult = require("./../base/HttpResult");
import MysqlConnect = require("./../base/MysqlConnect");
import Tool = require("./../base/Tool");
import Koa = require("koa");
/**
 * 项目相关模块
 * @module
 */
let queryParams:DataType.IQueryParams = {
    city:"深圳",
    area:null,
    professionId:null,
    itemId:null,
    order:null,
    currentPage:1,
    pageRows:10,
    location:null
}

/**
 * 主页热门项目接口中间件 - 处理请求
 * @params {number} currentPage - 分页的页码
 * @returns {HttpResult} 返回查询结果
 */
export async function commend(ctx:Koa.Context,next:any){
    if(ctx.request.body.currentPage){
        let result:any;
        try{
            result = await next();
            ctx.response.body = HttpResult.CreateSuccessResult(result);
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }else{
        ctx.throw(400);
    }
}

/**
 * 主页热门项目接口中间件 - 查询数据
 * @params {number} currentPage - 分页页码
 * @returns {Promise<any>} 返回查询结果
 */
export async function commendQuery(ctx:Koa.Context){
    queryParams.currentPage = ctx.request.body.currentPage;
    let sql = `select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id,p.hospital_id,h.name as hospitalname 
            from product as p left join hospital as h on p.hospital_id = h.id where p.id in (select product_id from product_ext where param_name = 'recommend') 
            limit ${(queryParams.currentPage-1)*queryParams.pageRows},${queryParams.currentPage*queryParams.pageRows}`;
    return MysqlConnect.query(sql);
}

/**
 * 项目页面项目信息中间件 - 处理请求
 * @param {number} currentPage - 分页页码
 * @param {number} professionId - 项目id
 */
export async function queryList(ctx:Koa.Context,next:()=>Promise<any>){
    if(ctx.request.body.currentPage&&ctx.request.body.professionId){
        try{
            let result:any[] = await next();
            ctx.response.body = result;
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }else{
        ctx.throw(400);
    }
}

/**
 * 项目页面项目信息中间件 - 处理请求
 * @params {Object} params - request.body
 */
export async function queryListQuery(ctx:Koa.Context){
    Tool.initObject(ctx.request.body,queryParams);
    let queryResult:any;
    let hasWhere = false;
    let sql = "select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id as professionId,p.hospital_id as hospitalId,h.name as hospitalname "+
                "from product as p left join hospital as h on p.hospital_id = h.id ";
    if(queryParams.area){
        !hasWhere?sql+="where ":"";
        hasWhere?sql+=" and ":"";
        hasWhere = true;
        sql += `h.area = '${queryParams.area}' `;
    }
    if(queryParams.city){
        !hasWhere?sql+="where ":"";
        hasWhere?sql+=" and ":"";
        hasWhere = true;
        sql += `h.city = '${queryParams.city}' `;
    }
    if(queryParams.professionId){
        !hasWhere?sql+="where ":"";
        hasWhere?sql+=" and ":"";
        hasWhere = true;
        sql += `p.type = '${queryParams.professionId}' `;
    }
    if(queryParams.itemId){
        !hasWhere?sql+="where ":"";
        hasWhere?sql+=" and ":"";
        hasWhere = true;
        sql += `p.profession_id = '${queryParams.itemId}' `;
    }
    if(queryParams.order){
        if(queryParams.order==="prefer_price asc"){
            sql += "order by p.prefer_price asc ";
        }
        if(queryParams.order==="prefer_price desc"){
            sql += "order by p.prefer_price desc ";
        }
        if(queryParams.order==="hospital_score asc "){
            sql += "order by h.score desc ";
        }
        if(queryParams.order==="sales desc"){
            sql += "order by p.sales desc ";
        }
    }
    sql += `limit ${(queryParams.currentPage-1)*queryParams.pageRows},${queryParams.currentPage*queryParams.pageRows}`;
    return new Promise<any>(async (resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
        try{
            queryResult = await MysqlConnect.query(sql);
            // 为了兼容之前java后台数据格式，需对数据进行改动
            for(let item of queryResult){
                item.hospital = {
                    "name":item.hospitalname,
                }
            }
            resolve(queryResult);
        }catch(err){
            reject(err);
        }
    })
}

/**
 * 项目页面项目详情中间件 - 处理请求
 * @param {string} accessToken - 用户token
 * @param {string} productId - 项目id
 * @returns {HttpResult|Error} 查询结果,异常时返回500
 */
export async function querybyid(ctx:Koa.Context,next:()=>Promise<any>){
    if(ctx.request.body.productId){
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

/**
 * 项目页面项目详情中间件 - 处理请求
 * @param {Object} params - req.body
 */
export async function querybyidQuery(ctx:Koa.Context){
    let productId:number = ctx.request.body.productId||null;
    let accessToken:string = ctx.request.body.accessToken||null;
    let focusSql:string = null;
    let productSql = `select p.id,p.title,p.introduction,p.hospital_id as hospitalId,p.pricetype,p.priceunit,p.samllimg,p.sales,p.stand_price as standPrice,p.prefer_price as preferPrice,p.samllimg,
            (select count(*) from focus where flag = 3 and focusId = '${productId}' and fansId in (select user_id from user_token where access_token = '${accessToken}')) as focusCount from product as p where id = '${productId}'`;
    let productResult = await MysqlConnect.query(productSql);
}