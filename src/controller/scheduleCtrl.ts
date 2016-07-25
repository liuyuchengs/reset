import MysqlConnect = require("./../modules/MysqlConnect");

export async function querybydoctorid(id:number){
    let date = new Date();
    let sql = "SELECT id as scheduleid,starttime,date as dateStr FROM schedule WHERE doctorid = '"+id+"' AND YEAR(date)= '"+date.getFullYear()+"' AND MONTH(date)= '"+(date.getMonth()+1)+"' AND DAY(date) >= '"+date.getDate()+"'";
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
        return new Promise<any>((resolve:(value:any)=>void)=>{
            resolve(result);
        })
    }catch(err){
        return new Promise<any>((resolve:(value:any)=>void,reject:(value:any)=>void)=>{
            reject(err);
        })
    }
}