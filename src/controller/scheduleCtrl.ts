import MysqlConnect = require("./../modules/MysqlConnect");

/**
 * 排班相关模块
 * @module
 */

/**
 * 查询医生排班信息
 * @param {number} id - 医生id
 * @returns {Http}
 */
export async function querybydoctorid(id:number){
    let date = new Date();
    let sql = "SELECT id as scheduleid,starttime,date as dateStr FROM schedule WHERE doctorid = '"+id+"' AND YEAR(date)= '"+date.getFullYear()+"' AND MONTH(date)= '"+(date.getMonth()+1)+"' AND DAY(date) >= '"+date.getDate()+"'";
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
            for(let index in queryResult){
                let indexCount = 0;
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