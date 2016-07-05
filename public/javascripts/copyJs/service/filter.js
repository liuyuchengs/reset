define(["app"],function(app){
    // 设置默认的头像
    app.filter("defaultHeadImg",function(){
        return function(input,sex){
            if(input===null||input===""){
                if(sex==="男"||sex===null||sex===""||sex===undefined){
                    input = "../contents/img/men-head.png";
                }else{
                    input = "../contents/img/women-head.png";
                }
            }
            return input;
        }
    })
    
    // 设置默认图片
    app.filter("defaultImg",function(){
        return function(input,type){
            if(input==null||input==""){
                if(type==="doc"){
                    input = "../contents/img/doc-head.png";
                }
                if(type==="pro"){
                    input = "../contents/img/p_default.png"
                }
            }
            return input;
        }
    })

})