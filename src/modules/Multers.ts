/// <reference path="./../../typings/index.d.ts" />
import multer = require("multer");

/**
 * Multers
 * 初始化multer中间件对象
 */
class Multers {
    /**
     * 上传路径
     */
    private path:string;
    /**
     * 初始化对象
     * @params path->上传路径
     */
    constructor(path?:string) {
        if(path){
            this.path = path;
        }else{
            this.path = "upload/";
        }
    }
    /**
     * 设置上传路径
     */
    setPath(path:string){
        if(path!==null){
            this.path = path;
        }
    }

    /**
     * 创建multer上传对象
     */
    getUpLoad(){
        let storage:any = {
            destination:(req:any,file:any,cb:any)=>{
                cb(null, this.path);
            },
            filename:(req:any,file:any,cb:any)=>{
                let list = file.originalname.split(".");
                cb(null,Date.now()+"."+list[1]);
            }
        }
        return multer({storage:storage});
    }
}


export = Multers;