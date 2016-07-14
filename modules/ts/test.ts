 /// <reference path="./../../typings/index.d.ts" />
 let fs = require("fs");
 
 function readFile(path:string){
     return new Promise<void>((resolve,reject)=>{
         fs.readFile(path,(err:any,res:any)=>{
            if(err!==null){
                reject(err);
            }else{
                resolve(res);
            }
        })
     });
 }

var fn = async function(){
    var result = await readFile("text.txt");
    console.log(result);
 }
 
fn();