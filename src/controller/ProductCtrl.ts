import NodeData = require("NodeData");
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import Tool = require("./../modules/Tool");
/**
 * 项目相关模块
 * ProductCtrl
 */
class ProductCtrl {
    private queryParams:NodeData.IQueryParams;
    constructor(queryParams?:NodeData.IQueryParams) {
        if(queryParams===null||queryParams===undefined){
            this.queryParams = {
                city:"深圳",
                area:null,
                professionId:null,
                itemId:null,
                order:null,
                currentPage:1,
                pageRows:10,
                location:null
            }
        }else{
            this.queryParams = queryParams;
        }
    }

    /**
     * 查询主页热门项目
     * @params currentPage->分页的当前页数
     */
    async queryRecommend(currentPage:number):Promise<HttpResult>{
        this.queryParams.currentPage = currentPage;
        let sql = "select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id,p.hospital_id,h.name as hospitalname "+
                    "from product as p left join hospital as h on p.hospital_id = h.id where p.id in (select product_id from product_ext where param_name = 'recommend') "+
                    "limit "+(this.queryParams.currentPage-1)*this.queryParams.pageRows+","+this.queryParams.currentPage*this.queryParams.pageRows;
        try{
            let queryResult = await MysqlConnect.query(sql);
            return new Promise<HttpResult>((resolve:(value:HttpResult)=>void)=>{
                resolve(HttpResult.CreateResult(queryResult,0,"success"));
            })
        }catch(err){
            return new Promise<any>((resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
                reject(err);
            })
        }
    }

    /**
     * 查询项目页面的项目信息
     * @params params->request.body
     */
    async queryList(params:any){
        Tool.initObject(params,this.queryParams);
        let queryResult:any;
        let hasWhere = false;
        let sql = "select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id as professionId,p.hospital_id as hospitalId,h.name as hospitalname "+
                    "from product as p left join hospital as h on p.hospital_id = h.id ";
        if(this.queryParams.area){
            !hasWhere?sql+="where ":"";
            hasWhere?sql+=" and ":"";
            hasWhere = true;
            sql += "h.area = '"+this.queryParams.area+"' ";
        }
        if(this.queryParams.city){
            !hasWhere?sql+="where ":"";
            hasWhere?sql+=" and ":"";
            hasWhere = true;
            sql += "h.city = '"+this.queryParams.city+"' ";
        }
        if(this.queryParams.professionId){
            !hasWhere?sql+="where ":"";
            hasWhere?sql+=" and ":"";
            hasWhere = true;
            sql += "p.type = "+this.queryParams.professionId+" ";
        }
        if(this.queryParams.itemId){
            !hasWhere?sql+="where ":"";
            hasWhere?sql+=" and ":"";
            hasWhere = true;
            sql += "p.profession_id = "+this.queryParams.itemId+" ";
        }
        if(this.queryParams.order){
            if(this.queryParams.order==="prefer_price asc"){
                sql += "order by p.prefer_price asc ";
            }
            if(this.queryParams.order==="prefer_price desc"){
                sql += "order by p.prefer_price desc ";
            }
            if(this.queryParams.order==="hospital_score asc "){
                sql += "order by h.score desc ";
            }
            if(this.queryParams.order==="sales desc"){
                sql += "order by p.sales desc ";
            }
        }
        sql += "limit "+(this.queryParams.currentPage-1)*this.queryParams.pageRows+","+this.queryParams.currentPage*this.queryParams.pageRows;
        try{
            queryResult = await MysqlConnect.query(sql);
            // 为了兼容之前java后台数据格式，需对数据进行改动
            for(let item of queryResult){
                item.hospital = {
                    "name":item.hospitalname,
                }
            }
            if(queryResult.hospitalname){
                queryResult
            }
            return new Promise<HttpResult>((resolve:(value:HttpResult)=>void)=>{
                resolve(queryResult);
            })
        }catch(err){
            return new Promise<any>((resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
                reject(err);
            })
        }
    }

    /**
     * 查询项目详情页面的
     */
    async querybyid(params:any){
        let productId:number = params.productId||null;
        let accessToken:string = params.accessToken||null;
        let focusSql:string = null;
        let productSql = "select p.id,p.title,p.introduction,p.hospital_id as hospitalId,p.pricetype,p.priceunit,p.samllimg,p.sales,p.stand_price as standPrice,p.prefer_price as preferPrice,p.samllimg, "+
                        +"(select count(*) from focus where flag = 3 and focusId = '"+productId+"' and fansId in (select user_id from user_token where access_token = '"+accessToken+"')) as focusCount"
                        "from product as p where id = "+productId;
        try{
            let productResult = await MysqlConnect.query(productSql);
            productResult[0].focusCount>0?productResult[0].focusState = 1:productResult[0].focusState = 2;
            return new Promise<HttpResult>((resolve:(value:HttpResult)=>void)=>{
                resolve(HttpResult.CreateSuccessResult(productResult[0]));
            })
        }catch(err){
            return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
                reject(err);
            })
        }
    }
}

export = ProductCtrl;