import User = require("./User");
import DropParams = require("./DropParams");
/**
 * 工具模块
 */
class Tool {

    /**
     * 保存用户信息
     */
    static user:User;

    /**
     * 保存host信息
     */
    static host:string = "https://www.uokang.com";
    constructor() {
    }

    /**
     * 设置local
     * @params key:localStorage键,val:localStorage值
     */
    static setLocal(key:string,val:Object){
        localStorage.setItem(key,JSON.stringify(val));
    }

    /**
     * 查找local
     * @params key:localStorage键
     * return localStorage值
     */
    static getLocal(key:string){
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * 删除local
     * @params key->localStorage键
     */
    static removeLocal(key:string){
        localStorage.removeItem(key);
    }

    /**
     * 清除所有local
     */
    static clearLocal(){
        localStorage.clear();
    }

    /**
     * 设置session
     * @params key->session键,val->session值
     */
    static setSession(key:string,val:Object){
        sessionStorage.setItem(key,JSON.stringify(val));
    }

    /**
     * 查找session
     * @params key->session键
     * return session值
     */
    static getSession(key:string){
        sessionStorage.getItem(key);
    }

    /**
     * 删除session
     * @params key->需要删除的session键
     */
    static removeSession(key:string){
        sessionStorage.removeItem(key);
    }

    /**
     * 跳转到指定url
     * @params url->需要跳转的完整url
     */
    static toUrl(url:string){
        if(url.length>0){
            location.href =  url;
        }
    }

    /**
     * 通过检查localStorage,判断是否登录
     */
    static checkLogin(){
        if(Tool.getLocal("user")){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 判断用户是否完成用户信息,检查所有项
     */
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

    /**
     * 判断变量是否为空
     * @params params->判断该变量是否为空，支持string,number,boolean
     * return ture->为空,false->非空
     */
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

    /**
     * 判断对象是否为空
     * @params obj->判断该对象是否为空，检查所有属性
     * return true->为空，false->非空
     */
    static emptyObject(obj:Object){
        let result:boolean = false;
        for(let props in obj){
            if(Tool.empty(obj[props])){
                result = true;
            }
        }
        return result;
    }

    /**
     * 设置下拉菜单项为选择状态
     * @params index->需要设置为选择状态的下拉对象索引，container->下拉对象容器
     */
    static select(index:number,container:Array<DropParams>){
        //如果已经选择则不做处理
        if(container[index].has){
            return ;
        }else{
            for(let item of container){
                if(item.has){
                    item.has = false;
                }
            }
            container[index].has = true;
        }
    }

    /**
     * 将对象转换成字符串
     * @params obj->需要转换的对象
     * return 转换成的字符串
     */
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

    /**
     * 获取查询参数
     * @params name->查询参数的key
     * return 查询参数的值，如果有
     */
    static queryString(name:string){
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let r = window.location.search.substr(1).match(reg);
        if(r != null){
            return decodeURI(r[2]);
        }
        return null;
    }

    /**
     * 取消window的scroll监听
     */
    static cancelWindowListen(){
        window.onscroll = null;
    }
    
}

export = Tool;