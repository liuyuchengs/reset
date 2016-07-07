declare interface IWeixin{

    /**
     * 初始化wx对象
     */
    wxConfig:()=>void;


    /**
     *  初始化wx对象后的操作
     */
    wxInit:()=>void;

    /**
     * 自定义分享内容
     */
    wxShare:(obj:IWX)=>void;

}