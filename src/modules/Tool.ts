/// <reference path="./../../typings/index.d.ts" />
import fs = require("fs");
import crypto = require("crypto");
import multer = require("multer");

/**
 * Tool
 * 工具类
 */
class Tool {
    private static cipher = crypto.createCipher("aes192","uk123456");
    private static decipher = crypto.createDecipher("aes192","uk123456");
    constructor() {}

    /**
     * 过滤查询数据库得到的数据
     * @params dest:需要得到的字段，source:需要过滤的源数据
     */
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

    /**
     * 对数据进行加密
     * @params value->需要加密的字符串
     * @return 加密后的字符串
     */
    static enCrypt(value:string):string{
        Tool.cipher.update(value,"utf8");
        return Tool.cipher.final("hex");
    }

    /**
     * 对数据进行解密
     * @params value->需要解密的字符串
     * @return 解密后的字符串
     */
    static deCrypt(value:string):string{
        Tool.decipher.update(value,"hex");
        return Tool.decipher.final("utf8");
    }

    /**
     * 创建multer上传对象
     * @params path->保存上传文件的路径,默认为public/upload
     */
    static getUpLoad(path?:string){
        path=path||"public/upload";
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path);
            },
            filename: function (req, file, cb) {
                let list = file.originalname.split(".");
                cb(null,Date.now()+"."+list[1]);
            }
        })
        return multer({storage:storage});
    }

    /**
     * async/await读取文本
     */
    static readFile(path:string):Promise<Buffer>{
        return new Promise<Buffer>((resolve:(value:Buffer)=>void,reject:(value:any)=>void)=>{
            fs.readFile(path,(err,data)=>{
                if(err!==null){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }

}

export = Tool;