/**
 * Tool
 * 工具类
 */
class Tool {
    constructor() {}
    static FilterResult(dest:string[],source:any){
        let result:any = {};
        for(let item of dest){
            if(source[item]){
                result[item] = source[item];
            }else{
                result[item] = null;
            }
        }
        return result;
    }
}

export = Tool;