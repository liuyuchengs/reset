/// <reference path="./../../../typings/index.d.ts" />

import mocha = require("mocha");
import chai = require("chai");
import Tool = require("./../base/Tool");
const expect = chai.expect;

describe("Tool",()=>{
    describe("enCrypt()",()=>{
        it("测试加密和解密函数",()=>{
            
        })
    }),
    describe("initObject",()=>{
        it("测试类型转换",()=>{
            let dest:any = {name:null,age:null,color:null};
            Tool.initObject({name:"tom",age:12,test:12},dest);
            expect(dest).to.eql({name:"tom",age:12,color:null});
        })
    })
    describe("checkObjectPropsEmpty",()=>{
        it("测试检查对象属性是否为空",()=>{
            let source:any ={};
            let props:string[] = [];
            expect(Tool.checkObjectPropsEmpty(source,props)).to.be.true;
        })
        it("测试检查对象属性是否为空",()=>{
            let source:any = {id:"12",name:"tom"};
            let props:string[] = ["id"];
            expect(Tool.checkObjectPropsEmpty(source,props)).to.be.false;
        })
        it("测试检查对象属性是否为空",()=>{
            let source:any = {id:"12",name:"tom"};
            let props:string[] = ["id","name","age"];
            expect(Tool.checkObjectPropsEmpty(source,props)).to.be.true;
        })
    })
})