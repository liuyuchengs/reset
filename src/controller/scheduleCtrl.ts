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

export async function autoSchedule(days:string[],times:string[]){
    return new Promise<any>(async (resolve:(value:any)=>void,reject:(value:any)=>void)=>{
        try{
            let doctors = await MysqlConnect.query("SELECT id,hospitalId FROM doctor");
            let sql:string = "INSERT INTO schedule(doctorid,starttime,status,hospital_id,number_limit,remain,date) values";
            for(let i1 in doctors){
                let doctorId:any = doctors[i1].id;
                let hospitalId:any = doctors[i1].hospitalId;
                for(let i2 in days){
                    for(let i3 in times){
                        sql += `('${doctorId}','${times[i3]}',1,'${hospitalId}',1,0,'${days[i2]}'),`;
                    }
                }
                sql = sql.slice(0,sql.length-1);
                let result = await MysqlConnect.query(sql);
                sql = "INSERT INTO schedule(doctorid,starttime,status,hospital_id,number_limit,remain,date) values";         
            } 
            resolve("success");
        }catch(err){
            reject(err);
        }
    })
    
}