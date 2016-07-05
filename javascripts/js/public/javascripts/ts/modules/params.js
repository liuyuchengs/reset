define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * ParamsObj:下拉参数对象
     */
    var ParamsObj = (function () {
        function ParamsObj(has, val, id) {
            this.has = has;
            this.val = val;
            this.id = id;
        }
        return ParamsObj;
    }());
    return ParamsObj;
});
