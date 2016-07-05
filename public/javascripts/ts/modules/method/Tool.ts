import User = require("./../data/User");
/**
 * Tool
 */
class Tool {
    static user:User;
    static host:string = "https://www.uokang.com";
    constructor() {
    }

    // 设置local
    static setLocal(key:string,val:Object){
        localStorage.setItem(key,JSON.stringify(val));
    }

    // 查找local
    static getLocal(key:string){
        return JSON.parse(localStorage.getItem(key));
    }

    // 删除local
    static removeLocal(key:string){
        localStorage.removeItem(key);
    }

    // 清除local
    static clearLocal(){
        localStorage.clear();
    }

    // 设置session
    static setSession(key:string,val:Object){
        sessionStorage.setItem(key,JSON.stringify(val));
    }

    // 查找session
    static getSession(key:string){
        sessionStorage.getItem(key);
    }

    // 删除session
    static removeSession(key:string){
        sessionStorage.removeItem(key);
    }

    // 跳转到指定url
    static toUrl(url:string){
        if(url.length>0){
            location.href =  url;
        }
    }

    // 判断是否登录
    static checkLogin(){
        if(Tool.getLocal("user")){
            return true;
        }else{
            return false;
        }
    }

    // 判断用户是否完成用户信息
    static infoComplete(){
        if(Tool.getLocal("user")){
            let user:User = <User>this.getLocal("user");
            if(Tool.emptyObject(user)){
                return true;
            }else{
                return false;
            }
        }else{ 
            return false;
        }
    }

    // 判断变量是否为空
    static empty(params:Object){
        let types = typeof params;
        switch(types){
            case "string":
                if(params===null||params===""){
                    return true;
                }else{
                    return false;
                }
            case "number":
                if(params===null){
                    return true;
                }else{
                    return false;
                }
            case "boolean":
                return params;
            default:
                return false;
        }
    }

    // 判断对象是否为空,true:为空，false:非空
    static emptyObject(obj:Object){
        let result:boolean = false;
        for(let props in obj){
            if(Tool.empty(obj[props])){
                result = true;
            }
        }
        return result;
    }

    // 下拉菜单选择项
    static select(pro:string,obj:Object){
        for(let proto in obj){
            if(proto == pro){
                if(obj[proto].has){
                    obj[proto].has = true;
                }
            }else{
                if(obj[proto].has){
                    obj[proto].has = false;
                }
            }
        }
    }

    //获取用户信息
    static getUser(){
        if(Tool.checkLogin()){

        }
    }

    //将对象转换成字符串
    static convertObj(obj:Object){
        var str = "";
        for(var prop in obj){
            if(obj[prop]!=null){
                str += "&" + prop + "=" + obj[prop];
            }
        }
        str = str.slice(0,1); //截取第一个"&"
        return str;
    }

    //获取查询参数
    static queryString(name:string){
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    }
    
}