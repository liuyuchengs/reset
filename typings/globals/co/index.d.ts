
declare module "co"{
    interface Co{
        test:string;
        wrap(options:any):any
    }
    var co:Co;
    export = co;
}