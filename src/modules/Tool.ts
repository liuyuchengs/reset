/// <reference path="./../../typings/index.d.ts" />
import fs = require("fs");
import crypto = require("crypto");
import multer = require("multer");

/**
 * @classdesc 各种辅助用的小工具
 */
class Tool {
    private static cipher = crypto.createCipher("aes192","uk123456");
    private static decipher = crypto.createDecipher("aes192","uk123456");
    constructor() {}

    /**
     * 过滤查询数据库得到的数据
     * @param {string} dest:需要得到的字段
     * @param {any} source:需要过滤的源数据
     * @returns {any} 过滤后的结果
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
     * 将source上的属性值转换到dest的同名属性上
     * @param {any} source - 数据源(req.body)
     * @param {any} dest - 接受数据的对象
     */
    static initObject(source:any,dest:any){
        for(let prop in dest){
            if(source[prop]){
                dest[prop] = source[prop];
            }else{
                dest[prop] = null;
            }
        }
    }

    /**
     * 对数据进行加密
     * @param {string} value - 需要加密的字符串
     * @return {string} 加密后的字符串
     */
    static enCrypt(value:string):string{
        Tool.cipher.update(value,"utf8");
        return Tool.cipher.final("hex");
    }

    /**
     * 对数据进行解密
     * @param {string} value - 需要解密的字符串
     * @return {string} 解密后的字符串
     */
    static deCrypt(value:string):string{
        Tool.decipher.update(value,"hex");
        return Tool.decipher.final("utf8");
    }

    /**
     * 为图片添加host
     * @param {string} host - url的host部分
     * @param {string} path - url的path部分
     */
    static addHost(host:string,path:string){
        return host+path;
    }

    /**
     * async/await读取文件
     * @param {string} path - 文件的path
     * @returns {Buffer} Buffer格式的文件数据
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

    /**
     * async/await修改文件名
     * @param {string} oldPath - 源文件的path
     * @param {string} newPath - 新文件的path
     * @returns {Buffer} Buffer格式的文件数据
     */
    static renameFile(oldPath:string,newPath:string):Promise<any>{
        return new Promise<any>((resolve:(value:any)=>void,reject:(value:any)=>void)=>{
            fs.rename(oldPath,newPath,(err)=>{
                if(err!==null){
                    reject(err);
                }else{
                    resolve(true);
                }
            })
        })
    }

}

export = Tool;