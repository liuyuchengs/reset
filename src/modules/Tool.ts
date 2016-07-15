/// <reference path="./../../typings/index.d.ts" />

import crypto = require("crypto");

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
}

export = Tool;