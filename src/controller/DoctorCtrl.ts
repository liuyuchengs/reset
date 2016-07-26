import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");


/**
 * 医生相关模块
 * @module
 * @pamra {number} id - 项目id
 * @returns {Object} 返回查询结果
 */
export async function querySchedule(id:number):Promise<any>{
    return new Promise<any>(async (resolve:(value:any)=>void,reject:(value:Error)=>void)=>{
        let date = new Date();
        let sql = "SELECT d.id,d.doctorname,d.hobby,d.score,d.hospitalid,d.face FROM doctor as d WHERE d.id in (SELECT doctorid FROM schedule WHERE hospital_id in (SELECT hospital_id FROM product WHERE id = '"+id+"') AND YEAR(date)= '"+date.getFullYear()+"' AND MONTH(date)= '"+(date.getMonth()+1)+"' AND DAY(date) >= '"+date.getDate()+"')";
        try{
            let queryResult = await MysqlConnect.query(sql);
            resolve({list:queryResult});
        }catch(err){
            reject(err);
        }
    })
}