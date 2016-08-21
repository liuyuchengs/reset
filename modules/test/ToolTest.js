/// <reference path="./../../../typings/index.d.ts" />
"use strict";
const chai = require("chai");
const Tool = require("./../base/Tool");
const expect = chai.expect;
describe("Tool", () => {
    describe("enCrypt()", () => {
        it("测试加密和解密函数", () => {
        });
    }),
        describe("initObject", () => {
            it("测试类型转换", () => {
                let dest = { name: null, age: null, color: null };
                Tool.initObject({ name: "tom", age: 12, test: 12 }, dest);
                expect(dest).to.eql({ name: "tom", age: 12, color: null });
            });
        });
    describe("checkObjectPropsEmpty", () => {
        it("测试检查对象属性是否为空", () => {
            let source = {};
            let props = [];
            expect(Tool.checkObjectPropsEmpty(source, props)).to.be.true;
        });
        it("测试检查对象属性是否为空", () => {
            let source = { id: "12", name: "tom" };
            let props = ["id"];
            expect(Tool.checkObjectPropsEmpty(source, props)).to.be.false;
        });
        it("测试检查对象属性是否为空", () => {
            let source = { id: "12", name: "tom" };
            let props = ["id", "name", "age"];
            expect(Tool.checkObjectPropsEmpty(source, props)).to.be.true;
        });
    });
});
//# sourceMappingURL=ToolTest.js.map