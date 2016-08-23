declare module "koa-ejs"{
    import * as Koa from "koa";

    interface Option{
        root?:string;
        layout?:string|boolean;
        viewExt?:string;
        cache?:boolean;
        debug?:boolean;
    }

    function Ejs(app:Koa,option:Option):any;

    export = Ejs;
}