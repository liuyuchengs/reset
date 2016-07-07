/**
 * 导航菜单
 */
declare interface INavMenu{
    home:boolean;
    doctor:boolean;
    interaction:boolean;
    user:boolean;
    has:boolean;
}

/**
 * 加载提示框
 */
declare interface ILoad{
    has:boolean;
    src:string;
    val:string;
}

/**
 * 消息提示框
 */
declare interface IMessageTip{
    has:boolean;
    message:string;
    hasCancel:boolean;
    hasComfirm:boolean;
    cancel:()=>void;
    comfirm:()=>void;
}

/**
 * 其他全局属性
 */
declare interface IGlobalProp{
    hasBgColor:boolean;
}

/**
 * 显示列表底部的提示文本
 */
declare interface IFollowTip{
    has:boolean;
    val:string;
}

/**
 * $rootScope变量接口
 */
declare interface IRootScope extends angular.IRootScopeService{
    navMenu:INavMenu;
    load:ILoad;
    messageTip:IMessageTip;
    followTip:IFollowTip;
    globalProp:IGlobalProp;
    switchNavMenu:(item:string)=>void;
    menuClick:(path:string)=>void;
    changeRoute:(path:string,query?:string)=>void;
}


declare module "IRootScope"{
    export = IRootScope;
}