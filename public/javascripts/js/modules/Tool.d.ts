/**
 * Tool extends ITool
 */
declare class Tool implements ITool {
    user: IUser;
    host: string;
    private $rootScope;
    private $location;
    constructor($rootScope: IRootScope, $location: angular.ILocationService, host: string);
    /**
     * 设置local
     * @params key:localStorage键,val:localStorage值
     */
    setLocal(key: string, val: any): void;
    /**
     * 查找local
     * @params key:localStorage键
     * return localStorage值
     */
    getLocal(key: string): any;
    /**
     * 删除local
     * @params key->localStorage键
     */
    removeLocal(key: string): void;
    /**
     * 清除所有local
     */
    clearLocal(): void;
    /**
     * 设置session
     * @params key->session键,val->session值
     */
    setSession(key: string, val: any): void;
    /**
     * 查找session
     * @params key->session键
     * return session值
     */
    getSession(key: string): any;
    /**
     * 删除session
     * @params key->需要删除的session键
     */
    removeSession(key: string): void;
    /**
     * 跳转到指定url
     * @params url->需要跳转的完整url
     */
    toUrl(url: string): void;
    /**
     * 改变路由
     * @params path->路径,search->查询字符串
     */
    changeRoute(path: string, search?: string): void;
    /**
     * 通过检查localStorage,判断是否登录
     */
    checkLogin(): boolean;
    /**
     * 判断用户是否完成用户信息,检查所有项
     */
    infoComplete(): boolean;
    /**
     * 确认按钮的提示框
     * @params mess->提示文本，callback->确认按钮处理函数，不传则使用默认处理函数
     */
    alert(mess: string, callback?: () => void): void;
    /**
     * 带确认按钮和取消按钮的提示框
     * @params mess->提示文本,callback->确认按钮处理函数,必传
     */
    comfirm(mess: string, callback: () => void): void;
    /**
     * 获取用户信息
     */
    loadUser(): void;
    /**
     * 判断变量是否为空
     * @params params->判断该变量是否为空，支持string,number,boolean
     * return ture->为空,false->非空
     */
    empty(params: any): boolean;
    /**
     * 判断对象是否为空
     * @params obj->判断该对象是否为空，检查所有属性
     * return true->为空，false->非空
     */
    emptyany(obj: any): boolean;
    /**
     * 设置下拉菜单项为选择状态
     * @params index->需要设置为选择状态的下拉对象索引，container->下拉对象容器
     */
    select(index: number, container: Array<IDropParams>): void;
    /**
     * 将对象转换成字符串
     * @params obj->需要转换的对象
     * return 转换成的字符串
     */
    convertParams(array: [[string, string | number | boolean]]): string;
    /**
     * 获取查询参数
     * @params name->查询参数的key
     * return 查询参数的值，如果有
     */
    queryString(name: string): string;
    /**
     * 取消window的scroll监听
     */
    cancelWindowListen(): void;
}
export = Tool;
