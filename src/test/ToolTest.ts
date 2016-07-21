/// <reference path="./../../typings/index.d.ts" />

import mocha = require("mocha");
import chai = require("chai");
import Tool = require("./../modules/Tool");
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
})