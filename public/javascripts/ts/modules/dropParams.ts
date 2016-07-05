    /**
     * ParamsObj:下拉参数对象
     */
    class DropParams {
        has:boolean;
        val:string;
        id:number;
        constructor(has:boolean,val:string,id:number) {
            this.has = has;
            this.val = val;
            this.id = id;
        }
    }

    export = DropParams;
