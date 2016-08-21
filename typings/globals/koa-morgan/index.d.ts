// koa-morgan模块定义

declare module "koa-morgan"{
    import * as Koa from "koa";
    import * as fs from "fs";
    // 定义option参数
    interface Option{
        stream:fs.WriteStream;
    }

    function morgan(format:'combined'|'common'|'dev'|'short'|'tiny',option:Option):{(ctx:Koa.Context,next?:()=>any):any};

    export = morgan;
}