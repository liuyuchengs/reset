import NodeData = require("NodeData");
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import Tool = require("./../modules/Tool");
/**
 * 项目相关模块
 * @module
 */
let queryParams:NodeData.IQueryParams = {
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
 * 查询主页热门项目
 * @params {number} currentPage - 分页的页码
 * @returns {HttpResult} 返回查询结果
 */
export async function queryRecommend(currentPage:number):Promise<HttpResult>{
    queryParams.currentPage = currentPage;
    return new Promise<any>(async (resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
        let sql = "select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id,p.hospital_id,h.name as hospitalname "+
                "from product as p left join hospital as h on p.hospital_id = h.id where p.id in (select product_id from product_ext where param_name = 'recommend') "+
                "limit "+(queryParams.currentPage-1)*queryParams.pageRows+","+queryParams.currentPage*queryParams.pageRows;
        try{
            let queryResult = await MysqlConnect.query(sql);
            resolve(HttpResult.CreateResult(queryResult,0,"success"));
        }catch(err){
            reject(err);
        }
    })
}

/**
 * 查询项目页面的项目信息
 * @params {Object} params - request.body
 */
export async function queryList(params:any){
    Tool.initObject(params,queryParams);
    let queryResult:any;
    let hasWhere = false;
    let sql = "select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id as professionId,p.hospital_id as hospitalId,h.name as hospitalname "+
                "from product as p left join hospital as h on p.hospital_id = h.id ";
    if(queryParams.area){
        !hasWhere?sql+="where ":"";
        hasWhere?sql+=" and ":"";
        hasWhere = true;
        sql += "h.area = '"+queryParams.area+"' ";
    }
    if(queryParams.city){
        !hasWhere?sql+="where ":"";
        hasWhere?sql+=" and ":"";
        hasWhere = true;
        sql += "h.city = '"+queryParams.city+"' ";
    }
    if(queryParams.professionId){
        !hasWhere?sql+="where ":"";
        hasWhere?sql+=" and ":"";
        hasWhere = true;
        sql += "p.type = "+queryParams.professionId+" ";
    }
    if(queryParams.itemId){
        !hasWhere?sql+="where ":"";
        hasWhere?sql+=" and ":"";
        hasWhere = true;
        sql += "p.profession_id = "+queryParams.itemId+" ";
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
    sql += "limit "+(queryParams.currentPage-1)*queryParams.pageRows+","+queryParams.currentPage*queryParams.pageRows;
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
 * 查询项目详情页面的
 * @param {Object} params - req.body
 */
export async function querybyid(params:any):Promise<HttpResult>{
    return new Promise<HttpResult>(async (resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
        let productId:number = params.productId||null;
        let accessToken:string = params.accessToken||null;
        let focusSql:string = null;
        let productSql = "select p.id,p.title,p.introduction,p.hospital_id as hospitalId,p.pricetype,p.priceunit,p.samllimg,p.sales,p.stand_price as standPrice,p.prefer_price as preferPrice,p.samllimg,"+
                "(select count(*) from focus where flag = 3 and focusId = '"+productId+"' and fansId in (select user_id from user_token where access_token = '"+accessToken+"')) as focusCount from product as p where id = '"+productId+"'";
        try{
            let productResult = await MysqlConnect.query(productSql);
            resolve(HttpResult.CreateSuccessResult(productResult[0]));
        }catch(err){
            reject(err);
        }
    })
}