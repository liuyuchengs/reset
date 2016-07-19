/// <reference path="./../../typings/index.d.ts" />
import request = require("request");
import fs = require("fs");
/**
 * 发起http请求
 * @params req->express经过parse后的req对象
 */
function proxyRequest(req:any,host:string){
    return new Promise<any>((resolve:(value:any)=>void,reject:(value:any)=>void)=>{
        if(req.method==="GET"){
            let getObj:any = {
                url:host+req.originalUrl,
            }
            if(req.headers.accessToken){
                getObj.headers = {
                    "accessToken":req.headers.accessToken,
                }
            }
            request.get(getObj,(err:any,httpRes:any,body:any)=>{
                if(err!==null){
                    reject(err);
                }else{
                    resolve(body);
                }
            })
        }
        if(req.method==="POST"){
            if(req.body.isMulter){
                let obj = {
                    url:host+req.originalUrl,
                    headers:{
                        "accessToken":req.headers.accesstoken,
                    },
                    formData:req.body.formData,
                }
                request.post(obj,(err:any,httpRes:any,body:any)=>{
                    if(err!==null){
                        reject(err);
                    }else{
                        resolve(body);
                    }
                })
            }else{
                let postObj:any = {
                    url:host+req.originalUrl,
                    form:req.body,
                }
                if(req.headers.accesstoken){
                    postObj.headers = {
                        "accessToken":req.headers.accesstoken,
                    }
                }
                request.post(postObj,(err:any,httpRes:any,body:any)=>{
                    if(err!==null){
                        reject(err);
                    }else{
                        resolve(body);
                    }
                })
            }
            
        }
        
    })
}


export = proxyRequest;