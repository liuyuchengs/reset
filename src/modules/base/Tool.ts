/// <reference path="./../../../typings/index.d.ts" />
import fs = require("fs");
import crypto = require("crypto");

/**
 * 各种辅助用的小工具
 * @module
 */

let cipher = crypto.createCipher("aes192","uk123456");
let decipher = crypto.createDecipher("aes192","uk123456");

/**
 * 检查对象内的某些字段是否为空
 * @param {any} source - 需要检查的对象
 * @param {string[]} props - 需要检查的字段
 * @returns {boolean} 检查结果,true->为空,false->不为空
 */
export function checkObjectPropsEmpty(source:any,props:string[]){
    let result:boolean = false;
    if(source==undefined||source==null||props===undefined||props===null){
        result = true;
    }else if(props.length<=0){
        result = true;
    }else{
        for(let prop of props){
            if(source[prop]==undefined&&source[prop]==null){
                result = true;
            }
        }
    }
    return result;
}

/**
 * 过滤查询数据库得到的数据
 * @param {string} dest:需要得到的字段
 * @param {any} source:需要过滤的源数据
 * @returns {any} 过滤后的结果
 */
export function FilterResult(dest:string[],source:any){
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
export function initObject(source:any,dest:any){
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
export function enCrypt(value:string):string{
    cipher.update(value,"utf8");
    return cipher.final("hex");
}

/**
 * 对数据进行解密
 * @param {string} value - 需要解密的字符串
 * @return {string} 解密后的字符串
 */
export function deCrypt(value:string):string{
    decipher.update(value,"hex");
    return decipher.final("utf8");
}

/**
 * 为图片添加host
 * @param {string} host - url的host部分
 * @param {string} path - url的path部分
 */
export function addHost(host:string,path:string){
    return host+path;
}

/**
 * async/await读取文件
 * @param {string} path - 文件的path
 * @returns {Buffer} Buffer格式的文件数据
 */ 
export function readFile(path:string):Promise<Buffer>{
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
export function renameFile(oldPath:string,newPath:string):Promise<any>{
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
