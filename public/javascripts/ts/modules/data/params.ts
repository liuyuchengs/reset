    /**
     * ParamsObj:参数对象
     */
    class ParamsObj {
        has:boolean;
        val:string;
        id:number;
        constructor(has:boolean,val:string,id:number) {
            this.has = has;
            this.val = val;
            this.id = id;
        }
    }

    export = ParamsObj;
