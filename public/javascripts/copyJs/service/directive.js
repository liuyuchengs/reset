define(["app"],function(app){
    // 图片加载失败后，使用设置的图片
    app.directive('fallbackSrc', function () {
        var fallbackSrc = {
            link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
            }
        }
        return fallbackSrc;
    });

    // 项目图片加载失败后，使用默认图片
    app.directive("productError",function(){
        return {
            restrict:"A",
            link:function(scope,iElement,iAttrs){
                iElement.bind("error",function(){
                    angular.element(this).attr("src","../contents/img/p_default.png");
                })
            }
        }
    })

    // 医生图片加载失败后，使用默认图片
    app.directive("doctorError",function(){
        return {
            restrict:"A",
            link:function(scope,iElement,iAttrs){
                iElement.bind("error",function(){
                    angular.element(this).attr("src","../contents/img/doc-head.png");
                })
            }
        }
    })

    // 用户头像加载失败后，使用默认图片
    app.directive("userError",function(){
        return {
            restrict:"A",
            link:function($scope,iElement,iAttrs){
                iElement.bind("error",function(){
                    var imgUrl = "../contents/img/men-head.png";
                    if(iAttrs.userError){
                        if(iAttrs.userError==="女"){
                            imgUrl = "../contents/img/women-head.png"
                        }
                    }
                    angular.element(this).attr("src",imgUrl);
                })
            }
        }
    })

})