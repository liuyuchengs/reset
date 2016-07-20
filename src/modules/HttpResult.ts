/// <reference path="./../../typings/index.d.ts" />

/**
 * HttpResult
 * http响应对象
 */
class HttpResult {
    /**
     * 响应的数据主体
     */
    data:any;
    /**
     * 响应的状态码,0->成功,1->不成功
     */
    code:number;
    /**
     * 响应的文本消息
     */
    message:string;
    /**
     * 构建HttpResult对象
     */
    constructor(data:any,code:number,message:string) {
        this.data = data;
        this.code = code;
        this.message = message;
    }

    /**
     * 静态创建HttpResult对象
     * data->数据主体,code:状态码,message:消息文本
     */
    static CreateResult(data:any,code:number,message:string){
        return new HttpResult(data,code,message);
    }

    /**
     * 静态创建失败的HttpResult对象
     */
     static CreateFailResult(message:string){
         return new HttpResult({},1,message);
     }

     /**
      * 静态创建成功的HttpResult对象
      */
      static CreateSuccessResult(obj:any){
          return new HttpResult(obj,0,"success");
      }
}

export = HttpResult;