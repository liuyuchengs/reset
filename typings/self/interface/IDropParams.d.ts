/**
 * ParamsObj:下拉参数接口
 */
declare interface IDropParams {
    /**
     * 标记是否被选中
     */
    has:boolean;
    /**
     * 存储下拉变量的值
     */
    val:string;
    /**
     * 存储下拉变量的查询id
     */
    id:number;
}

declare module "IDropParams"{
    export = IDropParams;
}

